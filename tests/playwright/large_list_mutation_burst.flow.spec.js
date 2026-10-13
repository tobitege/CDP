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

    await test.step('Evaluate Script: __raw_window.DataContext.NavigateToView("Elements")', async () => {
      await page.evaluate('__raw_window.DataContext.NavigateToView("Elements")');
    });

    await test.step('Wait for element to be visible', async () => {
      await expect.poll(() => page.evaluate('(function () { var e = document.querySelector(\'#TabElements\'); if (!e) return false; if (typeof e.isVisible === \'boolean\') return e.isVisible; var r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== \'hidden\'; })()'), { timeout: Number('5000') }).toBe(true);
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('40');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Elements.RootNodes.Count > 0 && __raw_window.DataContext.Elements.MutationReload.IsBusy == false', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Elements.RootNodes.Count > 0 && __raw_window.DataContext.Elements.MutationReload.IsBusy == false');
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Elements.MutationReload.RequestCount', async () => {
      variables['requestsBefore'] = await page.evaluate('__raw_window.DataContext.Elements.MutationReload.RequestCount');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Elements.MutationReload.ReloadCount', async () => {
      variables['reloadsBefore'] = await page.evaluate('__raw_window.DataContext.Elements.MutationReload.ReloadCount');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleHistory.Count', async () => {
      variables['burstIndex'] = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory.Count');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#tabPopups\').__raw_node.IsSelected = true; __raw_window.BtnAddLargeListIncrementally_Click(null, null); \'items-\' + document.querySelector(\'#borderLargeList\').__raw_node.Child.Children.Count"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "document.querySelector(\'#tabPopups\').__raw_node.IsSelected = true; __raw_window.BtnAddLargeListIncrementally_Click(null, null); \'items-\' + document.querySelector(\'#borderLargeList\').__raw_node.Child.Children.Count"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('120');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory.Count > ${burstIndex} && __raw_window.DataContext.Console.ConsoleHistory[${burstIndex}].Result == \'items-2000\'', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory.Count > ${burstIndex} && __raw_window.DataContext.Console.ConsoleHistory[${burstIndex}].Result == \'items-2000\''));
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('240');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Elements.MutationReload.RequestCount - ${requestsBefore} >= 2000', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Elements.MutationReload.RequestCount - ${requestsBefore} >= 2000'));
      await expect(result).toBeTruthy();
    });

    await test.step('Assert True: __raw_window.DataContext.Elements.MutationReload.IsBusy == false', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Elements.MutationReload.IsBusy == false');
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Assert True: __raw_window.DataContext.Elements.MutationReload.ReloadCount - ${reloadsBefore} >= 1', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Elements.MutationReload.ReloadCount - ${reloadsBefore} >= 1'));
      await expect(result).toBeTruthy();
    });

    await test.step('Assert True: __raw_window.DataContext.Elements.MutationReload.ReloadCount - ${reloadsBefore} <= 30', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Elements.MutationReload.ReloadCount - ${reloadsBefore} <= 30'));
      await expect(result).toBeTruthy();
    });

    await test.step('Assert True: (function () {\n    function find(nodes) {\n        for (var i = 0; i < nodes.Count; i++) {\n            var n = nodes[i];\n            for (var j = 0; j < n.AttributesList.Count; j++) {\n                var a = n.AttributesList[j];\n                if ((a.Name === \'id\' || a.Name === \'Name\') && a.Value === \'panelLargeList\') return n;\n            }\n            var found = find(n.Children);\n            if (found != null) return found;\n        }\n        return null;\n    }\n    var panel = find(__raw_window.DataContext.Elements.RootNodes);\n    return panel != null && panel.Children.Count == 2000;\n})()\n', async () => {
      const result = await page.evaluate('(function () {\n    function find(nodes) {\n        for (var i = 0; i < nodes.Count; i++) {\n            var n = nodes[i];\n            for (var j = 0; j < n.AttributesList.Count; j++) {\n                var a = n.AttributesList[j];\n                if ((a.Name === \'id\' || a.Name === \'Name\') && a.Value === \'panelLargeList\') return n;\n            }\n            var found = find(n.Children);\n            if (found != null) return found;\n        }\n        return null;\n    }\n    var panel = find(__raw_window.DataContext.Elements.RootNodes);\n    return panel != null && panel.Children.Count == 2000;\n})()\n');
      await expect(result).toBeTruthy();
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleHistory.Count', async () => {
      variables['afterBurstIndex'] = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory.Count');
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleInputText = "\'alive-\' + document.querySelectorAll(\'#panelLargeList TextBlock\').length"; __raw_window.DataContext.Console.EvaluateAsync();', async () => {
      await page.evaluate('__raw_window.DataContext.Console.ConsoleInputText = "\'alive-\' + document.querySelectorAll(\'#panelLargeList TextBlock\').length"; __raw_window.DataContext.Console.EvaluateAsync();');
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('120');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory.Count > ${afterBurstIndex} && __raw_window.DataContext.Console.ConsoleHistory[${afterBurstIndex}].Result == \'alive-2000\'', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory.Count > ${afterBurstIndex} && __raw_window.DataContext.Console.ConsoleHistory[${afterBurstIndex}].Result == \'alive-2000\''));
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Evaluate Script: __raw_window.DataContext.Console.ConsoleHistory.Count', async () => {
      variables['listOffIndex'] = await page.evaluate('__raw_window.DataContext.Console.ConsoleHistory.Count');
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

    await test.step('Assert True: __raw_window.DataContext.Console.ConsoleHistory.Count > ${listOffIndex} && __raw_window.DataContext.Console.ConsoleHistory[${listOffIndex}].Result == \'items-0\'', async () => {
      const result = await page.evaluate(interpolate('__raw_window.DataContext.Console.ConsoleHistory.Count > ${listOffIndex} && __raw_window.DataContext.Console.ConsoleHistory[${listOffIndex}].Result == \'items-0\''));
      await expect(result).toBeTruthy();
    });
          break;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
        }
      }
    });

    await test.step('Retry block', async () => {
      const maxRetries = Number('120');
      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');
      for (let attempt = 0; ; attempt++) {
        try {

    await test.step('Delay 250ms', async () => {
      await page.waitForTimeout(250);
    });

    await test.step('Assert True: __raw_window.DataContext.Elements.MutationReload.IsBusy == false', async () => {
      const result = await page.evaluate('__raw_window.DataContext.Elements.MutationReload.IsBusy == false');
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
