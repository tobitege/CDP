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

    await test.step('Wait for element to be visible', async () => {
      await expect.poll(() => page.evaluate('(function () { var e = document.querySelector(\'#TabConsole\'); if (!e) return false; if (typeof e.isVisible === \'boolean\') return e.isVisible; var r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== \'hidden\'; })()'), { timeout: Number('5000') }).toBe(true);
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleHistory.Count', async () => {
      variables['largeListOnIndex'] = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory.Count');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#tabPopups\').__raw_node.IsSelected = true; var b = document.querySelector(\'#borderLargeList\').__raw_node; if (b.Child == null) { __raw_window.BtnToggleLargeList_Click(null, null); } \'items-\' + b.Child.Children.Count"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#tabPopups\').__raw_node.IsSelected = true; var b = document.querySelector(\'#borderLargeList\').__raw_node; if (b.Child == null) { __raw_window.BtnToggleLargeList_Click(null, null); } \'items-\' + b.Child.Children.Count"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('40');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory.Count > ${largeListOnIndex} && __raw_window.DataContext.Console.ConsoleHistory[${largeListOnIndex}].Result == \'items-2000\'', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory.Count > ${largeListOnIndex} && __raw_window.DataContext.Console.ConsoleHistory[${largeListOnIndex}].Result == \'items-2000\''));
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleHistory.Count', async () => {
      variables['largeListQueryIndex'] = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory.Count');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "(function () { var t0 = Date.now(); var items = document.querySelectorAll(\'#panelLargeList TextBlock\'); var ms = Date.now() - t0; var last = \'\'; for (var i = 0; i < items.length; i++) { if (items[i].__raw_node.Text == \'Large List Item 2000\') { last = items[i].__raw_node.Text; } } return items.length + \':\' + ms + \':\' + last; })()"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "(function () { var t0 = Date.now(); var items = document.querySelectorAll(\'#panelLargeList TextBlock\'); var ms = Date.now() - t0; var last = \'\'; for (var i = 0; i < items.length; i++) { if (items[i].__raw_node.Text == \'Large List Item 2000\') { last = items[i].__raw_node.Text; } } return items.length + \':\' + ms + \':\' + last; })()"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('240');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory.Count > ${largeListQueryIndex}', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory.Count > ${largeListQueryIndex}'));
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory[${largeListQueryIndex}].Result.split(\':\')[0] == \'2000\'', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory[${largeListQueryIndex}].Result.split(\':\')[0] == \'2000\''));
      await expect(result).toBeTruthy();
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory[${largeListQueryIndex}].Result.split(\':\')[2] == \'Large List Item 2000\'', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory[${largeListQueryIndex}].Result.split(\':\')[2] == \'Large List Item 2000\''));
      await expect(result).toBeTruthy();
    });

    await test.step('Assert True: parseInt(__raw_window.DataContext.Console.ConsoleHistory[${largeListQueryIndex}].Result.split(\':\')[1]) < 10000', async () => {
      const result = await page.evaluate(interpolate('parseInt(__raw_window.DataContext.Console.ConsoleHistory[${largeListQueryIndex}].Result.split(\':\')[1]) < 10000'));
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleHistory.Count', async () => {
      variables['popupStatusQueryIndex'] = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory.Count');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "\'status-\' + document.querySelectorAll(\'#txtPopupStatus\').length"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "\'status-\' + document.querySelectorAll(\'#txtPopupStatus\').length"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('40');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory.Count > ${popupStatusQueryIndex}', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory.Count > ${popupStatusQueryIndex}'));
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory[${popupStatusQueryIndex}].Result == \'status-1\'', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory[${popupStatusQueryIndex}].Result == \'status-1\''));
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleHistory.Count', async () => {
      variables['largeListOffIndex'] = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory.Count');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "__raw_window.BtnToggleLargeList_Click(null, null); document.querySelector(\'#borderLargeList\').__raw_node.Child == null ? \'items-0\' : \'items-left\'"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "__raw_window.BtnToggleLargeList_Click(null, null); document.querySelector(\'#borderLargeList\').__raw_node.Child == null ? \'items-0\' : \'items-left\'"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('40');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory.Count > ${largeListOffIndex} && __raw_window.DataContext.Console.ConsoleHistory[${largeListOffIndex}].Result == \'items-0\'', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory.Count > ${largeListOffIndex} && __raw_window.DataContext.Console.ConsoleHistory[${largeListOffIndex}].Result == \'items-0\''));
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
