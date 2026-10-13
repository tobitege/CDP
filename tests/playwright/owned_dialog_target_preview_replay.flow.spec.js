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

    await test.step('Evaluate Script: __raw_window.DataContext.Connection.DisconnectAsync()', async () => {
      await page.evaluate('__raw_window.DataContext.Connection.DisconnectAsync()');
    });

    await test.step('Delay 300ms', async () => {
      await page.waitForTimeout(300);
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Connection.HostAddress = "http://127.0.0.1:9222"', async () => {
      await page.evaluate('__raw_window.DataContext.Connection.HostAddress = "http://127.0.0.1:9222"');
    });

    await test.step('Delay 300ms', async () => {
      await page.waitForTimeout(300);
    });

    await test.step('Tap on element #btnRefreshTargets', async () => {
      const element_5 = page.locator('#btnRefreshTargets');
      await element_5.click();
    });

    await test.step('Delay 300ms', async () => {
      await page.waitForTimeout(300);
    });

    await test.step('Tap on element #btnConnect', async () => {
      const element_7 = page.locator('#btnConnect');
      await element_7.click();
    });

    await test.step('Delay 1500ms', async () => {
      await page.waitForTimeout(1500);
    });

    await test.step('Assert True: __raw_window.DataContext.Connection.IsConnected', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Connection.IsConnected');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.NavigateToView("Recorder")', async () => {
      await page.evaluate('__raw_window.DataContext.NavigateToView("Recorder")');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Recorder.IsTestStudioActive = true', async () => {
      await page.evaluate('__raw_window.DataContext.Recorder.IsTestStudioActive = true');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Simulation.SelectedZoomPreset = "100%"', async () => {
      await page.evaluate('__raw_window.DataContext.Simulation.SelectedZoomPreset = "100%"');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Simulation.ResetPan()', async () => {
      await page.evaluate('__raw_window.DataContext.Simulation.ResetPan()');
    });

    await test.step('Wait for element to be visible', async () => {
      await expect.poll(() => page.evaluate('(function () { var e = document.querySelector(\'#imgScreenshot\'); if (!e) return false; if (typeof e.isVisible === \'boolean\') return e.isVisible; var r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== \'hidden\'; })()'), { timeout: Number('5000') }).toBe(true);
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleHistory.Count', async () => {
      variables['ownedDialogTabIndex'] = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory.Count');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#tabPopups\').__raw_node.IsSelected = true; var b = document.querySelector(\'#borderLargeList\').__raw_node; if (b.Child != null) { __raw_window.BtnToggleLargeList_Click(null, null); } document.querySelector(\'#tabPopups ScrollViewer\').__raw_node.ScrollToEnd(); \'tab-selected\'"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#tabPopups\').__raw_node.IsSelected = true; var b = document.querySelector(\'#borderLargeList\').__raw_node; if (b.Child != null) { __raw_window.BtnToggleLargeList_Click(null, null); } document.querySelector(\'#tabPopups ScrollViewer\').__raw_node.ScrollToEnd(); \'tab-selected\'"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('40');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory.Count > ${ownedDialogTabIndex} && __raw_window.DataContext.Console.ConsoleHistory[${ownedDialogTabIndex}].Result == \'tab-selected\'', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory.Count > ${ownedDialogTabIndex} && __raw_window.DataContext.Console.ConsoleHistory[${ownedDialogTabIndex}].Result == \'tab-selected\''));
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Delay 500ms', async () => {
      await page.waitForTimeout(500);
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('20');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 300ms', async () => {
      await page.waitForTimeout(300);
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleHistory.Count', async () => {
      variables['ownedDialogButtonPointIndex'] = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory.Count');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "(function () { var b = document.querySelector(\'#btnOpenOwnedDialog\'); var r = b.getBoundingClientRect(); var h = __raw_window.Bounds.Height; if (r.width <= 0 || r.y < 0 || r.y + r.height > h) return \'not-visible\'; return Math.round(r.x + r.width / 2) + \',\' + Math.round(r.y + r.height / 2); })()"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "(function () { var b = document.querySelector(\'#btnOpenOwnedDialog\'); var r = b.getBoundingClientRect(); var h = __raw_window.Bounds.Height; if (r.width <= 0 || r.y < 0 || r.y + r.height > h) return \'not-visible\'; return Math.round(r.x + r.width / 2) + \',\' + Math.round(r.y + r.height / 2); })()"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('40');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 100ms', async () => {
      await page.waitForTimeout(100);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory.Count > ${ownedDialogButtonPointIndex}', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory.Count > ${ownedDialogButtonPointIndex}'));
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory[${ownedDialogButtonPointIndex}].Result.indexOf(\',\') > 0', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory[${ownedDialogButtonPointIndex}].Result.indexOf(\',\') > 0'));
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Evaluate Script: (function () { var p = __raw_window.DataContext.Console.ConsoleHistory[${ownedDialogButtonPointIndex}].Result.split(\',\'); var r = document.querySelector(\'#imgScreenshot\').getBoundingClientRect(); return Math.round(r.x + parseFloat(p[0])); })()', async () => {
      variables['openDialogTapX'] = await page.evaluate(interpolate('(function () { var p = __raw_window.DataContext.Console.ConsoleHistory[${ownedDialogButtonPointIndex}].Result.split(\',\'); var r = document.querySelector(\'#imgScreenshot\').getBoundingClientRect(); return Math.round(r.x + parseFloat(p[0])); })()'));
    });

    await test.step('Evaluate Script: (function () { var p = __raw_window.DataContext.Console.ConsoleHistory[${ownedDialogButtonPointIndex}].Result.split(\',\'); var r = document.querySelector(\'#imgScreenshot\').getBoundingClientRect(); return Math.round(r.y + parseFloat(p[1])); })()', async () => {
      variables['openDialogTapY'] = await page.evaluate(interpolate('(function () { var p = __raw_window.DataContext.Console.ConsoleHistory[${ownedDialogButtonPointIndex}].Result.split(\',\'); var r = document.querySelector(\'#imgScreenshot\').getBoundingClientRect(); return Math.round(r.y + parseFloat(p[1])); })()'));
    });

    await test.step('Delay 1000ms', async () => {
      await page.waitForTimeout(1000);
    });

    await test.step('Tap on element ', async () => {
      const point = interpolate('${openDialogTapX}, ${openDialogTapY}').split(',').map(Number);
      if (point.length !== 2 || !point.every(Number.isFinite)) throw new Error('Invalid tap coordinates');
      await page.mouse.click(point[0], point[1]);
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('40');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Tap on element #btnRefreshTargets', async () => {
      const element_0 = page.locator('#btnRefreshTargets');
      await element_0.click();
    });

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: (function () { var t = __raw_window.DataContext.Connection.Targets; for (var i = 0; i < t.Count; i++) { if (t[i].Title == \'Sample Owned Dialog\') return true; } return false; })()', async () => {
      const result = await page.evaluate('(function () { var t = __raw_window.DataContext.Connection.Targets; for (var i = 0; i < t.Count; i++) { if (t[i].Title == \'Sample Owned Dialog\') return true; } return false; })()');
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Evaluate Script: (function () { var c = __raw_window.DataContext.Connection; for (var i = 0; i < c.Targets.Count; i++) { if (c.Targets[i].Title == \'Sample Owned Dialog\') { c.SelectedTarget = c.Targets[i]; return \'selected\'; } } return \'missing\'; })()', async () => {
      await page.evaluate('(function () { var c = __raw_window.DataContext.Connection; for (var i = 0; i < c.Targets.Count; i++) { if (c.Targets[i].Title == \'Sample Owned Dialog\') { c.SelectedTarget = c.Targets[i]; return \'selected\'; } } return \'missing\'; })()');
    });

    await test.step('Assert True: __raw_window.DataContext.Connection.SelectedTarget.Title == \'Sample Owned Dialog\'', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Connection.SelectedTarget.Title == \'Sample Owned Dialog\'');
      await expect(result).toBeTruthy();
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('40');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Connection.IsConnected', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Connection.IsConnected');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleHistory.Count', async () => {
      variables['ownedDialogTitleIndex'] = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory.Count');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "__raw_window.Title"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "__raw_window.Title"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Delay 300ms', async () => {
      await page.waitForTimeout(300);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory.Count > ${ownedDialogTitleIndex} && __raw_window.DataContext.Console.ConsoleHistory[${ownedDialogTitleIndex}].Result == \'Sample Owned Dialog\'', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory.Count > ${ownedDialogTitleIndex} && __raw_window.DataContext.Console.ConsoleHistory[${ownedDialogTitleIndex}].Result == \'Sample Owned Dialog\''));
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleHistory.Count', async () => {
      variables['dialogScopeIndex'] = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory.Count');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#btnOpenOwnedDialog\') == null && document.querySelectorAll(\'#btnOpenOwnedDialog\').length == 0 && document.querySelector(\'#btnOwnedDialogIncrement\') != null ? \'scoped\' : \'leaked\'"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#btnOpenOwnedDialog\') == null && document.querySelectorAll(\'#btnOpenOwnedDialog\').length == 0 && document.querySelector(\'#btnOwnedDialogIncrement\') != null ? \'scoped\' : \'leaked\'"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('40');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory.Count > ${dialogScopeIndex} && __raw_window.DataContext.Console.ConsoleHistory[${dialogScopeIndex}].Result == \'scoped\'', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory.Count > ${dialogScopeIndex} && __raw_window.DataContext.Console.ConsoleHistory[${dialogScopeIndex}].Result == \'scoped\''));
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Evaluate Script: __raw_window.DataContext.NavigateToView("Recorder")', async () => {
      await page.evaluate('__raw_window.DataContext.NavigateToView("Recorder")');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Recorder.IsTestStudioActive = true', async () => {
      await page.evaluate('__raw_window.DataContext.Recorder.IsTestStudioActive = true');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Simulation.SelectedZoomPreset = "100%"', async () => {
      await page.evaluate('__raw_window.DataContext.Simulation.SelectedZoomPreset = "100%"');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Simulation.ResetPan()', async () => {
      await page.evaluate('__raw_window.DataContext.Simulation.ResetPan()');
    });

    await test.step('Wait for element to be visible', async () => {
      await expect.poll(() => page.evaluate('(function () { var e = document.querySelector(\'#btnTestStudioClear\'); if (!e) return false; if (typeof e.isVisible === \'boolean\') return e.isVisible; var r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== \'hidden\'; })()'), { timeout: Number('5000') }).toBe(true);
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('40');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Simulation.DeviceWidth == 320 && __raw_window.DataContext.Simulation.DeviceHeight == 220', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Simulation.DeviceWidth == 320 && __raw_window.DataContext.Simulation.DeviceHeight == 220');
      await expect(result).toBeTruthy();
    });

    await test.step('Assert True: (function () { var img = __raw_window.DataContext.Simulation.ScreenshotImage; if (img == null) return false; var ratio = img.PixelSize.Width / img.PixelSize.Height; return Math.abs(ratio - 320 / 220) < 0.03; })()', async () => {
      const result = await page.evaluate('(function () { var img = __raw_window.DataContext.Simulation.ScreenshotImage; if (img == null) return false; var ratio = img.PixelSize.Width / img.PixelSize.Height; return Math.abs(ratio - 320 / 220) < 0.03; })()');
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleHistory.Count', async () => {
      variables['dialogButtonPointIndex'] = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory.Count');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "(function () { var r = document.querySelector(\'#btnOwnedDialogIncrement\').getBoundingClientRect(); return Math.round(r.x + r.width / 2) + \',\' + Math.round(r.y + r.height / 2); })()"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "(function () { var r = document.querySelector(\'#btnOwnedDialogIncrement\').getBoundingClientRect(); return Math.round(r.x + r.width / 2) + \',\' + Math.round(r.y + r.height / 2); })()"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('40');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory.Count > ${dialogButtonPointIndex} && __raw_window.DataContext.Console.ConsoleHistory[${dialogButtonPointIndex}].Result.indexOf(\',\') > 0', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory.Count > ${dialogButtonPointIndex} && __raw_window.DataContext.Console.ConsoleHistory[${dialogButtonPointIndex}].Result.indexOf(\',\') > 0'));
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Evaluate Script: (function () { var p = __raw_window.DataContext.Console.ConsoleHistory[${dialogButtonPointIndex}].Result.split(\',\'); var r = document.querySelector(\'#imgScreenshot\').getBoundingClientRect(); return Math.round(r.x + parseFloat(p[0])); })()', async () => {
      variables['previewTapX'] = await page.evaluate(interpolate('(function () { var p = __raw_window.DataContext.Console.ConsoleHistory[${dialogButtonPointIndex}].Result.split(\',\'); var r = document.querySelector(\'#imgScreenshot\').getBoundingClientRect(); return Math.round(r.x + parseFloat(p[0])); })()'));
    });

    await test.step('Evaluate Script: (function () { var p = __raw_window.DataContext.Console.ConsoleHistory[${dialogButtonPointIndex}].Result.split(\',\'); var r = document.querySelector(\'#imgScreenshot\').getBoundingClientRect(); return Math.round(r.y + parseFloat(p[1])); })()', async () => {
      variables['previewTapY'] = await page.evaluate(interpolate('(function () { var p = __raw_window.DataContext.Console.ConsoleHistory[${dialogButtonPointIndex}].Result.split(\',\'); var r = document.querySelector(\'#imgScreenshot\').getBoundingClientRect(); return Math.round(r.y + parseFloat(p[1])); })()'));
    });

    await test.step('Tap on element #btnTestStudioClear', async () => {
      const element_42 = page.locator('#btnTestStudioClear');
      await element_42.click();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Recorder.ClearRecording()', async () => {
      await page.evaluate('__raw_window.DataContext.Recorder.ClearRecording()');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Recorder.ToggleRecordCommand.Execute(null)', async () => {
      await page.evaluate('__raw_window.DataContext.Recorder.ToggleRecordCommand.Execute(null)');
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('20');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 100ms', async () => {
      await page.waitForTimeout(100);
    });

    await test.step('Assert True: __raw_window.DataContext.Recorder.IsRecording == true', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Recorder.IsRecording == true');
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Tap on element ', async () => {
      const point = interpolate('${previewTapX}, ${previewTapY}').split(',').map(Number);
      if (point.length !== 2 || !point.every(Number.isFinite)) throw new Error('Invalid tap coordinates');
      await page.mouse.click(point[0], point[1]);
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('40');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Recorder.TestStudio.Steps.Count > 0', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Recorder.TestStudio.Steps.Count > 0');
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Recorder.ToggleRecordCommand.Execute(null)', async () => {
      await page.evaluate('__raw_window.DataContext.Recorder.ToggleRecordCommand.Execute(null)');
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('40');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Recorder.IsRecording == false', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Recorder.IsRecording == false');
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Assert True: __raw_window.DataContext.Recorder.TestStudio.Steps[0].Selector == "#btnOwnedDialogIncrement"', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Recorder.TestStudio.Steps[0].Selector == "#btnOwnedDialogIncrement"');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleHistory.Count', async () => {
      variables['dialogCountAfterTapIndex'] = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory.Count');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#txtOwnedDialogCount\').__raw_node.Text"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#txtOwnedDialogCount\').__raw_node.Text"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('40');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory.Count > ${dialogCountAfterTapIndex}', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory.Count > ${dialogCountAfterTapIndex}'));
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory[${dialogCountAfterTapIndex}].Result == \'Dialog Clicks: 1\'', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory[${dialogCountAfterTapIndex}].Result == \'Dialog Clicks: 1\''));
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Recorder.TestStudio.IsRecordVideoEnabled = true; __raw_window.DataContext.Recorder.TestStudio.IsGenerateReportEnabled = true', async () => {
      await page.evaluate('__raw_window.DataContext.Recorder.TestStudio.IsRecordVideoEnabled = true; __raw_window.DataContext.Recorder.TestStudio.IsGenerateReportEnabled = true');
    });

    await test.step('Tap on element #btnTestStudioPlay', async () => {
      const element_56 = page.locator('#btnTestStudioPlay');
      await element_56.click();
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('60');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Recorder.TestStudio.IsExecuting == false', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Recorder.TestStudio.IsExecuting == false');
      await expect(result).toBeTruthy();
    });

    await test.step('Assert True: (function () { var s = __raw_window.DataContext.Recorder.TestStudio.Steps; if (s.Count == 0) return false; for (var i = 0; i < s.Count; i++) { if (!s[i].IsPassed) return false; } return true; })()', async () => {
      const result = await page.evaluate('(function () { var s = __raw_window.DataContext.Recorder.TestStudio.Steps; if (s.Count == 0) return false; for (var i = 0; i < s.Count; i++) { if (!s[i].IsPassed) return false; } return true; })()');
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleHistory.Count', async () => {
      variables['dialogCountAfterReplayIndex'] = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory.Count');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#txtOwnedDialogCount\').__raw_node.Text"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#txtOwnedDialogCount\').__raw_node.Text"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('40');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory.Count > ${dialogCountAfterReplayIndex}', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory.Count > ${dialogCountAfterReplayIndex}'));
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory[${dialogCountAfterReplayIndex}].Result == \'Dialog Clicks: 2\'', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory[${dialogCountAfterReplayIndex}].Result == \'Dialog Clicks: 2\''));
      await expect(result).toBeTruthy();
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

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "__raw_window.Close(); \'dialog-closed\'"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "__raw_window.Close(); \'dialog-closed\'"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('40');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Tap on element #btnRefreshTargets', async () => {
      const element_1 = page.locator('#btnRefreshTargets');
      await element_1.click();
    });

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: (function () { var t = __raw_window.DataContext.Connection.Targets; if (t.Count == 0) return false; for (var i = 0; i < t.Count; i++) { if (t[i].Title == \'Sample Owned Dialog\') return false; } return true; })()', async () => {
      const result = await page.evaluate('(function () { var t = __raw_window.DataContext.Connection.Targets; if (t.Count == 0) return false; for (var i = 0; i < t.Count; i++) { if (t[i].Title == \'Sample Owned Dialog\') return false; } return true; })()');
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Evaluate Script: (function () { var c = __raw_window.DataContext.Connection; for (var i = 0; i < c.Targets.Count; i++) { if (c.Targets[i].Title == \'Avalonia CDP Inspector Sample\') { c.SelectedTarget = c.Targets[i]; return \'selected\'; } } return \'missing\'; })()', async () => {
      await page.evaluate('(function () { var c = __raw_window.DataContext.Connection; for (var i = 0; i < c.Targets.Count; i++) { if (c.Targets[i].Title == \'Avalonia CDP Inspector Sample\') { c.SelectedTarget = c.Targets[i]; return \'selected\'; } } return \'missing\'; })()');
    });

    await test.step('Assert True: __raw_window.DataContext.Connection.SelectedTarget.Title == \'Avalonia CDP Inspector Sample\'', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Connection.SelectedTarget.Title == \'Avalonia CDP Inspector Sample\'');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Connection.ConnectAsync(); \'connecting\'', async () => {
      await page.evaluate('__raw_window.DataContext.Connection.ConnectAsync(); \'connecting\'');
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('40');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Connection.IsConnected', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Connection.IsConnected');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleHistory.Count', async () => {
      variables['mainWindowTitleIndex'] = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory.Count');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "__raw_window.Title"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "__raw_window.Title"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Delay 300ms', async () => {
      await page.waitForTimeout(300);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory.Count > ${mainWindowTitleIndex} && __raw_window.DataContext.Console.ConsoleHistory[${mainWindowTitleIndex}].Result == \'Avalonia CDP Inspector Sample\'', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory.Count > ${mainWindowTitleIndex} && __raw_window.DataContext.Console.ConsoleHistory[${mainWindowTitleIndex}].Result == \'Avalonia CDP Inspector Sample\''));
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await browser.close();
  });
});
