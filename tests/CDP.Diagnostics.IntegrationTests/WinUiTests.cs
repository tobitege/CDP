using System;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
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
    public async Task TestWinUiPopupAndOwnedWindowSupport()
    {
        var completed = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
        var phase = "starting the UI thread";
        void SetPhase(string value) => Volatile.Write(ref phase, value);
        var dispatcher = Assert.IsType<Microsoft.UI.Dispatching.DispatcherQueue>(WinUiTestHost.Dispatcher);
        Assert.True(dispatcher.TryEnqueue(async () =>
        {
            try
            {
                await VerifyWindows(SetPhase);
                completed.TrySetResult();
            }
            catch (Exception ex) { completed.TrySetException(ex); }
        }));
        try
        {
            await completed.Task.WaitAsync(TimeSpan.FromSeconds(45), TestContext.Current.CancellationToken);
        }
        catch (TimeoutException)
        {
            Assert.Fail($"WinUI test timed out while {Volatile.Read(ref phase)}. " +
                $"Interactive desktop: {Environment.UserInteractive}.");
        }
    }

    private static async Task ActivateAsync(Window window)
    {
        var content = Assert.IsAssignableFrom<FrameworkElement>(window.Content);
        var loaded = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
        content.Loaded += (_, _) => loaded.TrySetResult();
        window.Activate();
        if (content.IsLoaded) return;
        await loaded.Task.WaitAsync(TimeSpan.FromSeconds(10));
    }

    private static async Task VerifyWindows(Action<string> setPhase)
    {
        setPhase("creating the test windows");
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
            setPhase("activating the main window");
            await ActivateAsync(mainWindow);
            setPhase("activating the owned windows");
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
            popup.XamlRoot = Assert.IsType<XamlRoot>(mainGrid.XamlRoot);
            popup.IsOpen = true;
            mainGrid.UpdateLayout();

            setPhase("verifying the popup and owned window trees");
            var children = CdpVisualTreeHelper.GetChildren(mainGrid, false).ToList();
            Assert.Contains(dialogGrid, children);
            Assert.DoesNotContain(nestedGrid, children);
            Assert.Contains(popupBtn, children);
            Assert.Equal(mainGrid, CdpVisualTreeHelper.GetParent(dialogGrid, false));
            Assert.Equal(dialogGrid, CdpVisualTreeHelper.GetParent(nestedGrid, false));
            Assert.Equal(mainGrid, CdpVisualTreeHelper.GetParent(popupBtn, false));
            Assert.Equal(popupBtn, SelectorEngine.QuerySelector(mainGrid, "#PopupBtn"));
            Assert.Null(SelectorEngine.QuerySelector(dialogGrid, "#MainGrid"));
            Assert.Empty(SelectorEngine.QuerySelectorAll(dialogGrid, "#MainGrid"));
            Assert.True(CdpVisualTreeHelper.IsOverlayWindowFor(dialogWindow, nestedWindow));
            Assert.False(CdpVisualTreeHelper.IsOverlayWindowFor(dialogWindow, mainWindow));
        }
        finally
        {
            setPhase("closing the test windows");
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
