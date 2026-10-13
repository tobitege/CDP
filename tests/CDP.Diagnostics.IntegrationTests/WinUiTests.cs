using System;
using System.Linq;
using System.Runtime.ExceptionServices;
using System.Runtime.InteropServices;
using System.Threading;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Controls.Primitives;
using WinUI.Diagnostics.Cdp;
using Xunit;

namespace CDP.Diagnostics.IntegrationTests;

public partial class WinUiTests
{
    [LibraryImport("user32.dll", EntryPoint = "SetWindowLongPtrW")]
    private static partial nint SetWindowLongPtr(nint window, int index, nint value);

    [Fact]
    public void TestWinUiPopupAndOwnedWindowSupport()
    {
        Exception? failure = null;
        var thread = new Thread(() =>
        {
            try
            {
                WinRT.ComWrappersSupport.InitializeComWrappers();
                Application.Start(_ => new TestApplication(() =>
                {
                    try { VerifyWindows(); }
                    catch (Exception ex) { failure = ex; }
                    finally { Application.Current.Exit(); }
                }));
            }
            catch (Exception ex) { failure = ex; }
        }) { IsBackground = true };
        thread.SetApartmentState(ApartmentState.STA);
        thread.Start();
        Assert.True(thread.Join(TimeSpan.FromSeconds(45)), "WinUI test application did not finish.");
        if (failure != null) ExceptionDispatchInfo.Capture(failure).Throw();
    }

    private sealed class TestApplication(Action verify) : Application
    {
        protected override void OnLaunched(LaunchActivatedEventArgs args)
        {
            Microsoft.UI.Dispatching.DispatcherQueue.GetForCurrentThread().TryEnqueue(() => verify());
        }
    }

    private static void VerifyWindows()
    {
        CdpServer.EnsureInitialized();
        var mainGrid = new Grid { Name = "MainGrid" };
        var mainWindow = new Window { Content = mainGrid };
        var dialogGrid = new Grid { Name = "DialogGrid" };
        var dialogWindow = new Window { Content = dialogGrid };
        var nestedGrid = new Grid { Name = "NestedGrid" };
        var nestedWindow = new Window { Content = nestedGrid };
        var popupBtn = new Button { Name = "PopupBtn", Content = "Popup Button" };
        var popup = new Popup { Child = popupBtn };
        try
        {
            mainWindow.Activate();
            dialogWindow.Activate();
            nestedWindow.Activate();
            SetWindowLongPtr(WinRT.Interop.WindowNative.GetWindowHandle(dialogWindow), -8,
                WinRT.Interop.WindowNative.GetWindowHandle(mainWindow));
            SetWindowLongPtr(WinRT.Interop.WindowNative.GetWindowHandle(nestedWindow), -8,
                WinRT.Interop.WindowNative.GetWindowHandle(dialogWindow));
            CdpServer.Register(mainWindow, "MainWindow");
            CdpServer.Register(dialogWindow, "DialogWindow");
            CdpServer.Register(nestedWindow, "NestedWindow");
            mainGrid.Children.Add(popup);
            popup.XamlRoot = mainGrid.XamlRoot;
            popup.IsOpen = true;
            mainGrid.UpdateLayout();

            var children = CdpVisualTreeHelper.GetChildren(mainGrid, false).ToList();
            Assert.Contains(dialogGrid, children);
            Assert.DoesNotContain(nestedGrid, children);
            Assert.Contains(popupBtn, children);
            Assert.Equal(mainGrid, CdpVisualTreeHelper.GetParent(dialogGrid, false));
            Assert.Equal(dialogGrid, CdpVisualTreeHelper.GetParent(nestedGrid, false));
            Assert.Equal(mainGrid, CdpVisualTreeHelper.GetParent(popupBtn, false));
            Assert.Equal(popupBtn, SelectorEngine.QuerySelector(mainGrid, "#PopupBtn"));
            Assert.Null(SelectorEngine.QuerySelector(dialogGrid, "#MainGrid"));
            Assert.True(CdpVisualTreeHelper.IsOverlayWindowFor(dialogWindow, nestedWindow));
            Assert.False(CdpVisualTreeHelper.IsOverlayWindowFor(dialogWindow, mainWindow));
        }
        finally
        {
            popup.IsOpen = false;
            CdpServer.Unregister(nestedWindow);
            CdpServer.Unregister(dialogWindow);
            CdpServer.Unregister(mainWindow);
            nestedWindow.Close();
            dialogWindow.Close();
            mainWindow.Close();
        }
    }
}
