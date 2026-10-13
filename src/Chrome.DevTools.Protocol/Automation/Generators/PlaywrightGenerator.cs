using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Chrome.DevTools.Protocol;

public class PlaywrightGenerator : ICodeGenerator
{
    public RecordingFormat Format => RecordingFormat.PlaywrightTest;
    public string TabHeader => "Playwright Script";
    public string TitleText => "Generated Playwright Test Script";
    public string ExportButtonText => "Export Playwright";

    public string Generate(IEnumerable<RecordedStep> steps, string hostAddress)
    {
        var stepsList = steps.ToList();
        var sb = new StringBuilder();
        sb.AppendLine("import { test, expect, chromium } from '@playwright/test';");
        sb.AppendLine();
        sb.AppendLine("test.describe('CDP Recorded Tests', () => {");
        sb.AppendLine("  test('recorded test', async () => {");

        string host = hostAddress;
        if (string.IsNullOrEmpty(host))
        {
            host = "http://localhost:9222";
        }
        if (!host.StartsWith("http://") && !host.StartsWith("https://"))
        {
            host = "http://" + host;
        }
        if (host.EndsWith("/"))
        {
            host = host.Substring(0, host.Length - 1);
        }

        sb.AppendLine($"    const browser = await chromium.connectOverCDP('{EscapeJsString(host)}');");
        sb.AppendLine("    const context = browser.contexts()[0];");
        sb.AppendLine("    const page = context.pages()[0];");
        if (FlattenSteps(stepsList).Any(step => !string.IsNullOrEmpty(step.AssignTo) || step.Point.Contains("${") || step.Value.Contains("${") || step.Selector.Contains("${")))
        {
            sb.AppendLine("    const variables = Object.create(null);");
            sb.AppendLine("    const interpolate = value => value.replace(/\\$\\{([^}]+)\\}/g, (_, key) => {");
            sb.AppendLine("      if (!Object.hasOwn(variables, key)) throw new Error('Unresolved flow variable: ' + key);");
            sb.AppendLine("      return String(variables[key]);");
            sb.AppendLine("    });");
        }
        sb.AppendLine();

        bool hasViewportStep = stepsList.Any(s => s.Type == "setViewport");
        if (!hasViewportStep)
        {
            sb.AppendLine("    await test.step('Set viewport size', async () => {");
            sb.AppendLine("      await page.setViewportSize({ width: 800, height: 600 });");
            sb.AppendLine("    });");
        }

        AppendSteps(sb, stepsList);
        sb.AppendLine();
        sb.AppendLine("    await browser.close();");
        sb.AppendLine("  });");
        sb.AppendLine("});");

        return sb.ToString();
    }

    private static IEnumerable<RecordedStep> FlattenSteps(IEnumerable<RecordedStep> steps)
    {
        foreach (var step in steps)
        {
            yield return step;
            foreach (var child in FlattenSteps(step.NestedSteps)) yield return child;
        }
    }

    private static void AppendSteps(StringBuilder sb, IReadOnlyList<RecordedStep> stepsList)
    {
        for (int i = 0; i < stepsList.Count; i++)
        {
            var step = stepsList[i];
            sb.AppendLine();
            if (step.Type == "retry")
            {
                sb.AppendLine("    await test.step('Retry block', async () => {");
                sb.AppendLine($"      const maxRetries = Number({ScriptValue(step.Value)});");
                sb.AppendLine("      if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new Error('Invalid retry count');");
                sb.AppendLine("      for (let attempt = 0; ; attempt++) {");
                sb.AppendLine("        try {");
                AppendSteps(sb, step.NestedSteps);
                sb.AppendLine("          break;");
                sb.AppendLine("        } catch (error) {");
                sb.AppendLine("          if (attempt >= maxRetries) throw error;");
                sb.AppendLine("        }");
                sb.AppendLine("      }");
                sb.AppendLine("    });");
            }
            else if (step.Type == "waitForVisible" || step.Type == "waitForHidden")
            {
                var state = step.Type == "waitForVisible" ? "visible" : "hidden";
                sb.AppendLine($"    await test.step('Wait for element to be {state}', async () => {{");
                // Poll the runtime facade as well as browser DOM nodes. Native CDP targets do not
                // run Playwright's injected DOM mutation polling script.
                var visibility = "(function () { var e = document.querySelector('" + EscapeJsString(step.Selector) + "'); " +
                    "if (!e) return false; if (typeof e.isVisible === 'boolean') return e.isVisible; " +
                    "var r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden'; })()";
                sb.AppendLine($"      await expect.poll(() => page.evaluate({ScriptValue(visibility)}), {{ timeout: Number({ScriptValue(step.Value)}) }}).toBe({(state == "visible" ? "true" : "false")});");
                sb.AppendLine("    });");
            }
            else if (step.Type == "click")
            {
                var options = new List<string>();
                if (step.Button != "left") options.Add($"button: '{step.Button}'");
                if (step.ClickCount > 1) options.Add($"clickCount: {step.ClickCount}");
                if (step.Modifiers > 0)
                {
                    var modsList = string.Join(", ", GetModifiersList(step.Modifiers).Select(m => $"'{m}'"));
                    options.Add($"modifiers: [{modsList}]");
                }
                string optStr = options.Count > 0 ? $"{{ {string.Join(", ", options)} }}" : "";

                sb.AppendLine($"    await test.step('Click on element {EscapeJsString(TranslatePlaywrightSelector(step.Selector))}', async () => {{");
                sb.AppendLine($"      const element_{i} = page.locator('{EscapeJsString(TranslatePlaywrightSelector(step.Selector))}');");
                sb.AppendLine($"      await element_{i}.click({optStr});");
                sb.AppendLine("    });");
            }
            else if (step.Type == "tap" || step.Type == "tapOn")
            {
                sb.AppendLine($"    await test.step('Tap on element {EscapeJsString(TranslatePlaywrightSelector(step.Selector))}', async () => {{");
                if (step.PointX.HasValue && step.PointY.HasValue)
                {
                    sb.AppendLine($"      await page.mouse.click({FormatNumber(step.PointX.Value)}, {FormatNumber(step.PointY.Value)});");
                }
                else if (!string.IsNullOrEmpty(step.Point))
                {
                    sb.AppendLine($"      const point = {ScriptValue(step.Point)}.split(',').map(Number);");
                    sb.AppendLine("      if (point.length !== 2 || !point.every(Number.isFinite)) throw new Error('Invalid tap coordinates');");
                    sb.AppendLine("      await page.mouse.click(point[0], point[1]);");
                }
                else
                {
                    sb.AppendLine($"      const element_{i} = page.locator('{EscapeJsString(TranslatePlaywrightSelector(step.Selector))}');");
                    // A YAML tap is the framework-neutral primary-pointer action.
                    // Use click so generated desktop tests do not require a touch-enabled context.
                    sb.AppendLine($"      await element_{i}.click();");
                }
                sb.AppendLine("    });");
            }
            else if (step.Type == "doubleTap" || step.Type == "doubleTapOn")
            {
                sb.AppendLine($"    await test.step('Double tap on element {EscapeJsString(TranslatePlaywrightSelector(step.Selector))}', async () => {{");
                sb.AppendLine($"      const element_{i} = page.locator('{EscapeJsString(TranslatePlaywrightSelector(step.Selector))}');");
                sb.AppendLine($"      await element_{i}.dblclick();");
                sb.AppendLine("    });");
            }
            else if (step.Type == "longPress" || step.Type == "longPressOn")
            {
                sb.AppendLine($"    await test.step('Long press on element {EscapeJsString(TranslatePlaywrightSelector(step.Selector))}', async () => {{");
                sb.AppendLine($"      const element_{i} = page.locator('{EscapeJsString(TranslatePlaywrightSelector(step.Selector))}');");
                sb.AppendLine($"      await element_{i}.click({{ delay: 1000 }});");
                sb.AppendLine("    });");
            }
            else if (step.Type == "back")
            {
                sb.AppendLine($"    await test.step('Navigate back', async () => {{");
                sb.AppendLine($"      await page.goBack();");
                sb.AppendLine("    });");
            }
            else if (step.Type == "clear" || step.Type == "clearText")
            {
                sb.AppendLine($"    await test.step('Clear text in element {EscapeJsString(TranslatePlaywrightSelector(step.Selector))}', async () => {{");
                sb.AppendLine($"      const element_{i} = page.locator('{EscapeJsString(TranslatePlaywrightSelector(step.Selector))}');");
                sb.AppendLine($"      await element_{i}.clear();");
                sb.AppendLine("    });");
            }
            else if (step.Type == "delay")
            {
                int delayMs = 1000;
                if (int.TryParse(step.Value, out int val))
                {
                    delayMs = val;
                }
                sb.AppendLine($"    await test.step('Delay {delayMs}ms', async () => {{");
                sb.AppendLine($"      await page.waitForTimeout({delayMs});");
                sb.AppendLine("    });");
            }
            else if (step.Type == "change" || step.Type == "inputText" || step.Type == "input")
            {
                if (string.IsNullOrEmpty(step.Selector))
                {
                    sb.AppendLine($"    await test.step('Type text into focused element', async () => {{");
                    sb.AppendLine($"      await page.keyboard.type('{EscapeJsString(step.Value)}');");
                    sb.AppendLine("    });");
                }
                else
                {
                    sb.AppendLine($"    await test.step('Type text in element {EscapeJsString(TranslatePlaywrightSelector(step.Selector))}', async () => {{");
                    sb.AppendLine($"      const element_{i} = page.locator('{EscapeJsString(TranslatePlaywrightSelector(step.Selector))}');");
                    sb.AppendLine($"      await element_{i}.fill('{EscapeJsString(step.Value)}');");
                    sb.AppendLine("    });");
                }
            }
            else if (step.Type == "setViewport")
            {
                sb.AppendLine($"    await test.step('Set viewport size', async () => {{");
                sb.AppendLine($"      await page.setViewportSize({{ width: {step.Width}, height: {step.Height} }});");
                sb.AppendLine("    });");
            }
            else if (step.Type == "navigate")
            {
                sb.AppendLine($"    await test.step('Navigate to {EscapeJsString(step.Url)}', async () => {{");
                sb.AppendLine($"      await page.goto('{EscapeJsString(step.Url)}');");
                sb.AppendLine("    });");
            }
            else if (step.Type == "keydown" || step.Type == "pressKey")
            {
                string keyToPress = string.IsNullOrEmpty(step.Key) ? step.Value : step.Key;
                sb.AppendLine($"    await test.step('Press key {EscapeJsString(keyToPress)}', async () => {{");
                if (step.Modifiers > 0)
                {
                    foreach (var mod in GetModifiersList(step.Modifiers)) sb.AppendLine($"      await page.keyboard.down('{mod}');");
                }
                sb.AppendLine($"      await page.keyboard.press('{EscapeJsString(keyToPress)}');");
                if (step.Modifiers > 0)
                {
                    foreach (var mod in GetModifiersList(step.Modifiers)) sb.AppendLine($"      await page.keyboard.up('{mod}');");
                }
                sb.AppendLine("    });");
            }
            else if (step.Type == "dragAndDrop")
            {
                sb.AppendLine($"    await test.step('Drag element {EscapeJsString(TranslatePlaywrightSelector(step.Selector))} to {EscapeJsString(TranslatePlaywrightSelector(step.TargetSelector))}', async () => {{");
                sb.AppendLine($"      const source_{i} = page.locator('{EscapeJsString(TranslatePlaywrightSelector(step.Selector))}');");
                sb.AppendLine($"      const target_{i} = page.locator('{EscapeJsString(TranslatePlaywrightSelector(step.TargetSelector))}');");
                if (step.Modifiers > 0)
                {
                    foreach (var mod in GetModifiersList(step.Modifiers)) sb.AppendLine($"      await page.keyboard.down('{mod}');");
                }
                sb.AppendLine($"      await source_{i}.dragTo(target_{i});");
                if (step.Modifiers > 0)
                {
                    foreach (var mod in GetModifiersList(step.Modifiers)) sb.AppendLine($"      await page.keyboard.up('{mod}');");
                }
                sb.AppendLine("    });");
            }
            else if (step.Type == "scroll")
            {
                sb.AppendLine($"    await test.step('Scroll element or page', async () => {{");
                if (!string.IsNullOrEmpty(step.Selector))
                {
                    sb.AppendLine($"      const element_{i} = page.locator('{EscapeJsString(TranslatePlaywrightSelector(step.Selector))}');");
                    sb.AppendLine($"      await element_{i}.evaluate(el => {{");
                    sb.AppendLine($"        let parent = el;");
                    sb.AppendLine($"        while (parent) {{");
                    sb.AppendLine($"          if (parent.scrollHeight > parent.clientHeight && window.getComputedStyle(parent).overflowY !== 'visible') {{");
                    sb.AppendLine($"            parent.scrollBy({-step.OffsetX}, {-step.OffsetY});");
                    sb.AppendLine($"            return;");
                    sb.AppendLine($"          }}");
                    sb.AppendLine($"          parent = parent.parentElement;");
                    sb.AppendLine($"        }}");
                    sb.AppendLine($"        window.scrollBy({-step.OffsetX}, {-step.OffsetY});");
                    sb.AppendLine($"      }});");
                }
                else
                {
                    sb.AppendLine($"      await page.evaluate(() => window.scrollBy({-step.OffsetX}, {-step.OffsetY}));");
                }
                sb.AppendLine("    });");
            }
            else if (step.Type == "assertVisible")
            {
                sb.AppendLine($"    await test.step('Assert element {EscapeJsString(TranslatePlaywrightSelector(step.Selector))} is visible', async () => {{");
                sb.AppendLine($"      await expect(page.locator('{EscapeJsString(TranslatePlaywrightSelector(step.Selector))}')).toBeVisible();");
                sb.AppendLine("    });");
            }
            else if (step.Type == "assertNotVisible")
            {
                sb.AppendLine($"    await test.step('Assert element {EscapeJsString(TranslatePlaywrightSelector(step.Selector))} is hidden', async () => {{");
                sb.AppendLine($"      await expect(page.locator('{EscapeJsString(TranslatePlaywrightSelector(step.Selector))}')).toBeHidden();");
                sb.AppendLine("    });");
            }
            else if (step.Type == "assertTrue")
            {
                sb.AppendLine($"    await test.step('Assert True: {EscapeJsString(step.Value)}', async () => {{");
                sb.AppendLine($"      const result = await page.evaluate({ScriptValue(step.Value)});");
                sb.AppendLine($"      await expect(result).toBeTruthy();");
                sb.AppendLine("    });");
            }
            else if (step.Type == "assertFalse")
            {
                sb.AppendLine($"    await test.step('Assert False: {EscapeJsString(step.Value)}', async () => {{");
                sb.AppendLine($"      const result = await page.evaluate({ScriptValue(step.Value)});");
                sb.AppendLine($"      await expect(result).toBeFalsy();");
                sb.AppendLine("    });");
            }
            else if (step.Type == "evalScript" || step.Type == "runScript")
            {
                sb.AppendLine($"    await test.step('Evaluate Script: {EscapeJsString(step.Value)}', async () => {{");
                var assignment = string.IsNullOrEmpty(step.AssignTo) ? "" : $"variables['{EscapeJsString(step.AssignTo)}'] = ";
                sb.AppendLine($"      {assignment}await page.evaluate({ScriptValue(step.Value)});");
                sb.AppendLine("    });");
            }
            else
            {
                sb.AppendLine($"    // Warning: Unsupported step type '{step.Type}'");
            }
        }

    }

    private static string ScriptValue(string value)
    {
        var quoted = $"'{EscapeJsString(value)}'";
        return value.Contains("${") ? $"interpolate({quoted})" : quoted;
    }

    private static List<string> GetModifiersList(int modifiers)
    {
        var list = new List<string>();
        if ((modifiers & 1) != 0) list.Add("Alt");
        if ((modifiers & 2) != 0) list.Add("Control");
        if ((modifiers & 4) != 0) list.Add("Meta");
        if ((modifiers & 8) != 0) list.Add("Shift");
        return list;
    }

        private static string TranslatePlaywrightSelector(string selector)
    {
        if (string.IsNullOrEmpty(selector)) return "";
        return selector.Replace(":contains(", ":has-text(");
    }

    private static string EscapeJsString(string? value)
    {
        if (value == null) return "";
        return value
            .Replace("\\", "\\\\")
            .Replace("'", "\\'")
            .Replace("\n", "\\n")
            .Replace("\r", "\\r")
            .Replace("\t", "\\t");
    }

    private static string FormatNumber(double value)
    {
        return value.ToString("0.################", System.Globalization.CultureInfo.InvariantCulture);
    }
}
