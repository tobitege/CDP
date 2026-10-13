import { test, expect, chromium } from '@playwright/test';

test.describe('CDP Recorded Tests', () => {
  test('recorded test', async () => {
    const browser = await chromium.connectOverCDP('http://127.0.0.1:9223');
    const context = browser.contexts()[0];
    const page = context.pages()[0];
    const variables = Object.create(null);
    const interpolate = value => value.replace(/\$\{([^}]+)\}/g, (_, key) => {
      if (!Object.hasOwn(variables, key)) throw new Error('Unresolved flow variable: ' + key);
      return String(variables[key]);
    });

    await test.step('Set viewport size', async () => {
      await page.setViewportSize({ width: 800, height: 600 });
    });

    await test.step('Evaluate Script: __raw_window.Width = 1280; __raw_window.Height = 800', async () => {
      await page.evaluate('__raw_window.Width = 1280; __raw_window.Height = 800');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Connection.DisconnectCommand.Execute(null)', async () => {
      await page.evaluate('__raw_window.DataContext.Connection.DisconnectCommand.Execute(null)');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Connection.HostAddress = "http://127.0.0.1:9222"', async () => {
      await page.evaluate('__raw_window.DataContext.Connection.HostAddress = "http://127.0.0.1:9222"');
    });

    await test.step('Delay 300ms', async () => {
      await page.waitForTimeout(300);
    });

    await test.step('Tap on element #btnRefreshTargets', async () => {
      const element_4 = page.locator('#btnRefreshTargets');
      await element_4.click();
    });

    await test.step('Delay 300ms', async () => {
      await page.waitForTimeout(300);
    });

    await test.step('Tap on element #btnConnect', async () => {
      const element_6 = page.locator('#btnConnect');
      await element_6.click();
    });

    await test.step('Delay 1500ms', async () => {
      await page.waitForTimeout(1500);
    });

    await test.step('Assert True: __raw_window.DataContext.Connection.IsConnected', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Connection.IsConnected');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.NavigateToView("Console")', async () => {
      await page.evaluate('__raw_window.DataContext.NavigateToView("Console")');
    });

    await test.step('Delay 500ms', async () => {
      await page.waitForTimeout(500);
    });

    await test.step('Assert True: document.querySelector(\'#TabConsole\') != null', async () => {
      const result = await page.evaluate('document.querySelector(\'#TabConsole\') != null');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#tabPopups\').isSelected = true; \'popups\'"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#tabPopups\').isSelected = true; \'popups\'"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Delay 1000ms', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('Evaluate Script: __raw_window.DataContext.NavigateToView("Recorder")', async () => {
      await page.evaluate('__raw_window.DataContext.NavigateToView("Recorder")');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Recorder.IsTestStudioActive = true', async () => {
      await page.evaluate('__raw_window.DataContext.Recorder.IsTestStudioActive = true');
    });

    await test.step('Delay 500ms', async () => {
      await page.waitForTimeout(500);
    });

    await test.step('Assert True: document.querySelector(\'#btnTestStudioClear\') != null', async () => {
      const result = await page.evaluate('document.querySelector(\'#btnTestStudioClear\') != null');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Simulation.SelectedZoomPreset = "50%"', async () => {
      await page.evaluate('__raw_window.DataContext.Simulation.SelectedZoomPreset = "50%"');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Simulation.ResetPan()', async () => {
      await page.evaluate('__raw_window.DataContext.Simulation.ResetPan()');
    });

    await test.step('Delay 1500ms', async () => {
      await page.waitForTimeout(1500);
    });

    await test.step('Tap on element #btnTestStudioClear', async () => {
      const element_21 = page.locator('#btnTestStudioClear');
      await element_21.click();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Recorder.ClearRecording()', async () => {
      await page.evaluate('__raw_window.DataContext.Recorder.ClearRecording()');
    });

    await test.step('Delay 300ms', async () => {
      await page.waitForTimeout(300);
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Recorder.ToggleRecordCommand.Execute(null)', async () => {
      await page.evaluate('__raw_window.DataContext.Recorder.ToggleRecordCommand.Execute(null)');
    });

    await test.step('Delay 500ms', async () => {
      await page.waitForTimeout(500);
    });

    await test.step('Assert True: __raw_window.DataContext.Recorder.IsRecording == true', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Recorder.IsRecording == true');
      await expect(result).toBeTruthy();
    });

    await test.step('Assert True: document.querySelector(\'#imgScreenshot\').__raw_node.Source != null', async () => {
      const result = await page.evaluate('document.querySelector(\'#imgScreenshot\').__raw_node.Source != null');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: globalThis.previewHistoryIndex = __raw_window.DataContext.Console.ConsoleHistory.Count;\n__raw_window.DataContext.Console.ConsoleInputText = "(function () { var r = document.querySelector(\'#btnContextMenu\').getBoundingClientRect(); return JSON.stringify({ x: r.x + r.width / 2, y: r.y + r.height / 2, width: __raw_window.Bounds.Width, height: __raw_window.Bounds.Height }); })()";\n__raw_window.DataContext.Console.EvaluateAsync();\n', async () => {
      await page.evaluate('globalThis.previewHistoryIndex = __raw_window.DataContext.Console.ConsoleHistory.Count;\n__raw_window.DataContext.Console.ConsoleInputText = "(function () { var r = document.querySelector(\'#btnContextMenu\').getBoundingClientRect(); return JSON.stringify({ x: r.x + r.width / 2, y: r.y + r.height / 2, width: __raw_window.Bounds.Width, height: __raw_window.Bounds.Height }); })()";\n__raw_window.DataContext.Console.EvaluateAsync();\n');
    });

    await test.step('Delay 1000ms', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory.Count > previewHistoryIndex', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory.Count > previewHistoryIndex');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: (function () { var p = JSON.parse(__raw_window.DataContext.Console.ConsoleHistory[previewHistoryIndex].Result); var r = document.querySelector(\'#imgScreenshot\').getBoundingClientRect(); return r.x + p.x * r.width / p.width * __raw_window.DataContext.Simulation.ZoomLevel; })()', async () => {
      variables['previewTapX'] = await page.evaluate('(function () { var p = JSON.parse(__raw_window.DataContext.Console.ConsoleHistory[previewHistoryIndex].Result); var r = document.querySelector(\'#imgScreenshot\').getBoundingClientRect(); return r.x + p.x * r.width / p.width * __raw_window.DataContext.Simulation.ZoomLevel; })()');
    });

    await test.step('Evaluate Script: (function () { var p = JSON.parse(__raw_window.DataContext.Console.ConsoleHistory[previewHistoryIndex].Result); var r = document.querySelector(\'#imgScreenshot\').getBoundingClientRect(); return r.y + p.y * r.height / p.height * __raw_window.DataContext.Simulation.ZoomLevel; })()', async () => {
      variables['previewTapY'] = await page.evaluate('(function () { var p = JSON.parse(__raw_window.DataContext.Console.ConsoleHistory[previewHistoryIndex].Result); var r = document.querySelector(\'#imgScreenshot\').getBoundingClientRect(); return r.y + p.y * r.height / p.height * __raw_window.DataContext.Simulation.ZoomLevel; })()');
    });

    await test.step('Tap on element ', async () => {
      const point = interpolate('${previewTapX}, ${previewTapY}').split(',').map(Number);
      if (point.length !== 2 || !point.every(Number.isFinite)) throw new Error('Invalid tap coordinates');
      await page.mouse.click(point[0], point[1]);
    });

    await test.step('Delay 800ms', async () => {
      await page.waitForTimeout(800);
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Recorder.ToggleRecordCommand.Execute(null)', async () => {
      await page.evaluate('__raw_window.DataContext.Recorder.ToggleRecordCommand.Execute(null)');
    });

    await test.step('Delay 2500ms', async () => {
      await page.waitForTimeout(2500);
    });

    await test.step('Assert True: __raw_window.DataContext.Recorder.IsRecording == false', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Recorder.IsRecording == false');
      await expect(result).toBeTruthy();
    });

    await test.step('Assert True: __raw_window.DataContext.Recorder.TestStudio.Steps.Count > 0', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Recorder.TestStudio.Steps.Count > 0');
      await expect(result).toBeTruthy();
    });

    await test.step('Assert True: __raw_window.DataContext.Recorder.TestStudio.Steps[0].Selector == "#btnContextMenu"', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Recorder.TestStudio.Steps[0].Selector == "#btnContextMenu"');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Recorder.TestStudio.IsRecordVideoEnabled = true; __raw_window.DataContext.Recorder.TestStudio.IsGenerateReportEnabled = true', async () => {
      await page.evaluate('__raw_window.DataContext.Recorder.TestStudio.IsRecordVideoEnabled = true; __raw_window.DataContext.Recorder.TestStudio.IsGenerateReportEnabled = true');
    });

    await test.step('Tap on element #btnTestStudioPlay', async () => {
      const element_41 = page.locator('#btnTestStudioPlay');
      await element_41.click();
    });

    await test.step('Delay 8000ms', async () => {
      await page.waitForTimeout(8000);
    });

    await test.step('Assert True: (function () {\n    var studio = __raw_window.DataContext.Recorder.TestStudio;\n    if (studio.IsExecuting || studio.Steps.Count == 0) return false;\n    for (var i = 0; i < studio.Steps.Count; i++) {\n        if (!studio.Steps[i].IsPassed) return false;\n    }\n    return true;\n})()\n', async () => {
      const result = await page.evaluate('(function () {\n    var studio = __raw_window.DataContext.Recorder.TestStudio;\n    if (studio.IsExecuting || studio.Steps.Count == 0) return false;\n    for (var i = 0; i < studio.Steps.Count; i++) {\n        if (!studio.Steps[i].IsPassed) return false;\n    }\n    return true;\n})()\n');
      await expect(result).toBeTruthy();
    });

    await test.step('Assert True: __raw_window.DataContext.Recorder.TestStudio.HasLastRunRecording == true', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Recorder.TestStudio.HasLastRunRecording == true');
      await expect(result).toBeTruthy();
    });

    await test.step('Assert True: __raw_window.DataContext.Recorder.TestStudio.LastReportPath.length > 0', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Recorder.TestStudio.LastReportPath.length > 0');
      await expect(result).toBeTruthy();
    });

    await test.step('Assert True: __raw_window.DataContext.Recorder.TestStudio.LastPdfReportPath.length > 0', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Recorder.TestStudio.LastPdfReportPath.length > 0');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.NavigateToView("Console")', async () => {
      await page.evaluate('__raw_window.DataContext.NavigateToView("Console")');
    });

    await test.step('Delay 500ms', async () => {
      await page.waitForTimeout(500);
    });

    await test.step('Assert True: document.querySelector(\'#TabConsole\') != null', async () => {
      const result = await page.evaluate('document.querySelector(\'#TabConsole\') != null');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "var btn = document.querySelector(\'#btnContextMenu\').__raw_node; btn.ContextMenu.Open(btn); \'Opened\'"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "var btn = document.querySelector(\'#btnContextMenu\').__raw_node; btn.ContextMenu.Open(btn); \'Opened\'"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Delay 1500ms', async () => {
      await page.waitForTimeout(1500);
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'[text=\\"Menu Item 2\\"]\').id";\n__raw_window.DataContext.Console.EvaluateAsync();\n', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'[text=\\"Menu Item 2\\"]\').id";\n__raw_window.DataContext.Console.EvaluateAsync();\n');
    });

    await test.step('Delay 1500ms', async () => {
      await page.waitForTimeout(1500);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory[__raw_window.DataContext.Console.ConsoleHistory.Count - 1].Result == \'menuItem2\'', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory[__raw_window.DataContext.Console.ConsoleHistory.Count - 1].Result == \'menuItem2\'');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'MenuItem[Header=\\"Menu Item 1\\"]\').id";\n__raw_window.DataContext.Console.EvaluateAsync();\n', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'MenuItem[Header=\\"Menu Item 1\\"]\').id";\n__raw_window.DataContext.Console.EvaluateAsync();\n');
    });

    await test.step('Delay 1500ms', async () => {
      await page.waitForTimeout(1500);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory[__raw_window.DataContext.Console.ConsoleHistory.Count - 1].Result == \'menuItem1\'', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory[__raw_window.DataContext.Console.ConsoleHistory.Count - 1].Result == \'menuItem1\'');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#contextMenu\').Items.Count"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#contextMenu\').Items.Count"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Delay 1500ms', async () => {
      await page.waitForTimeout(1500);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory[__raw_window.DataContext.Console.ConsoleHistory.Count - 1].Result == \'2\'', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory[__raw_window.DataContext.Console.ConsoleHistory.Count - 1].Result == \'2\'');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#contextMenu\').Items[1].Header"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#contextMenu\').Items[1].Header"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Delay 1500ms', async () => {
      await page.waitForTimeout(1500);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory[__raw_window.DataContext.Console.ConsoleHistory.Count - 1].Result == \'Menu Item 2\'', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory[__raw_window.DataContext.Console.ConsoleHistory.Count - 1].Result == \'Menu Item 2\'');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "Array.from(document.querySelectorAll(\'MenuItem\')).map(function (m) { return m.Header; }).join(\',\')"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "Array.from(document.querySelectorAll(\'MenuItem\')).map(function (m) { return m.Header; }).join(\',\')"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Delay 1500ms', async () => {
      await page.waitForTimeout(1500);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory[__raw_window.DataContext.Console.ConsoleHistory.Count - 1].Result == \'Menu Item 1,Menu Item 2\'', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory[__raw_window.DataContext.Console.ConsoleHistory.Count - 1].Result == \'Menu Item 1,Menu Item 2\'');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#contextMenu\').__raw_node.Close()"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#contextMenu\').__raw_node.Close()"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await browser.close();
  });
});
