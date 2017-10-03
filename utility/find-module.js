"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const strings_1 = require("../strings");
/**
 * Find the module referred by a set of options passed to the schematics.
 */
function findModuleFromOptions(host, options) {
    if (options.hasOwnProperty('skipImport') && options.skipImport) {
        return undefined;
    }
    if (!options.module) {
        const pathToCheck = (options.sourceDir || '') + '/' + (options.path || '')
            + (options.flat ? '' : '/' + strings_1.dasherize(options.name));
        return core_1.normalize(findModule(host, pathToCheck));
    }
    else {
        const modulePath = core_1.normalize('/' + options.sourceDir + '/' + (options.appRoot || options.path) + '/' + options.module);
        const moduleBaseName = core_1.normalize(modulePath).split('/').pop();
        if (host.exists(modulePath)) {
            return core_1.normalize(modulePath);
        }
        else if (host.exists(modulePath + '.ts')) {
            return core_1.normalize(modulePath + '.ts');
        }
        else if (host.exists(modulePath + '.module.ts')) {
            return core_1.normalize(modulePath + '.module.ts');
        }
        else if (host.exists(modulePath + '/' + moduleBaseName + '.module.ts')) {
            return core_1.normalize(modulePath + '/' + moduleBaseName + '.module.ts');
        }
        else {
            throw new Error('Specified module does not exist');
        }
    }
}
exports.findModuleFromOptions = findModuleFromOptions;
/**
 * Function to find the "closest" module to a generated file's path.
 */
function findModule(host, generateDir) {
    let closestModule = core_1.normalize('/' + generateDir);
    const allFiles = host.files;
    let modulePath = null;
    const moduleRe = /\.module\.ts$/;
    const routingModuleRe = /-routing\.module\.ts/;
    while (closestModule) {
        const matches = allFiles
            .filter(p => moduleRe.test(p) &&
            !routingModuleRe.test(p) &&
            !/\//g.test(p.replace(closestModule + '/', '')));
        if (matches.length == 1) {
            modulePath = matches[0];
            break;
        }
        else if (matches.length > 1) {
            throw new Error('More than one module matches. Use skip-import option to skip importing '
                + 'the component into the closest module.');
        }
        closestModule = core_1.dirname(closestModule);
    }
    if (!modulePath) {
        throw new Error('Could not find an NgModule for the new component. Use the skip-import '
            + 'option to skip importing components in NgModule.');
    }
    return core_1.normalize(modulePath);
}
exports.findModule = findModule;
/**
 * Build a relative path from one file path to another file path.
 */
function buildRelativePath(from, to) {
    from = core_1.normalize(from);
    to = core_1.normalize(to);
    // Convert to arrays.
    const fromParts = from.split('/');
    const toParts = to.split('/');
    // Remove file names (preserving destination)
    fromParts.pop();
    const toFileName = toParts.pop();
    const relativePath = core_1.relative(core_1.normalize(fromParts.join('/')), core_1.normalize(toParts.join('/')));
    let pathPrefix = '';
    // Set the path prefix for same dir or child dir, parent dir starts with `..`
    if (!relativePath) {
        pathPrefix = '.';
    }
    else if (!relativePath.startsWith('.')) {
        pathPrefix = `./`;
    }
    if (pathPrefix && !pathPrefix.endsWith('/')) {
        pathPrefix += '/';
    }
    return pathPrefix + (relativePath ? relativePath + '/' : '') + toFileName;
}
exports.buildRelativePath = buildRelativePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JpY2FyZG9fdmFyYW5kYS9Qcm9qZWN0cy9kZXZraXQvIiwic291cmNlcyI6WyJwYWNrYWdlcy9zY2hlbWF0aWNzL2FuZ3VsYXIvdXRpbGl0eS9maW5kLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtDQUEwRTtBQUUxRSx3Q0FBdUM7QUFjdkM7O0dBRUc7QUFDSCwrQkFBc0MsSUFBVSxFQUNWLE9BQXNCO0lBQzFELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDL0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLFdBQVcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7Y0FDdEQsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsbUJBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUV4RSxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxVQUFVLEdBQUcsZ0JBQVMsQ0FDMUIsR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RixN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Q0EwQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBQYXRoLCBkaXJuYW1lLCBub3JtYWxpemUsIHJlbGF0aXZlIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgVHJlZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7IGRhc2hlcml6ZSB9IGZyb20gJy4uL3N0cmluZ3MnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kdWxlT3B0aW9ucyB7XG4gIG1vZHVsZT86IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBmbGF0PzogYm9vbGVhbjtcbiAgc291cmNlRGlyPzogc3RyaW5nO1xuICBwYXRoPzogc3RyaW5nO1xuICBza2lwSW1wb3J0PzogYm9vbGVhbjtcbiAgYXBwUm9vdD86IHN0cmluZztcbn1cblxuXG4vKipcbiAqIEZpbmQgdGhlIG1vZHVsZSByZWZlcnJlZCBieSBhIHNldCBvZiBvcHRpb25zIHBhc3NlZCB0byB0aGUgc2NoZW1hdGljcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRNb2R1bGVGcm9tT3B0aW9ucyhob3N0OiBUcmVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBNb2R1bGVPcHRpb25zKTogUGF0aCB8IHVuZGVmaW5lZCB7XG4gIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdza2lwSW1wb3J0JykgJiYgb3B0aW9ucy5za2lwSW1wb3J0KSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICghb3B0aW9ucy5tb2R1bGUpIHtcbiAgICBjb25zdCBwYXRoVG9DaGVjayA9IChvcHRpb25zLnNvdXJjZURpciB8fCAnJykgKyAnLycgKyAob3B0aW9ucy5wYXRoIHx8ICcnKVxuICAgICAgICAgICAgICAgICAgICAgICsgKG9wdGlvbnMuZmxhdCA/ICcnIDogJy8nICsgZGFzaGVyaXplKG9wdGlvbnMubmFtZSkpO1xuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZShmaW5kTW9kdWxlKGhvc3QsIHBhdGhUb0NoZWNrKSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbW9kdWxlUGF0aCA9IG5vcm1hbGl6ZShcbiAgICAgICcvJyArIG9wdGlvbnMuc291cmNlRGlyICsgJy8nICsgKG9wdGlvbnMuYXBwUm9vdCB8fCBvcHRpb25zLnBhdGgpICsgJy8nICsgb3B0aW9ucy5tb2R1bGUpO1xuICAgIGNvbnN0IG1vZHVsZUJhc2VOYW1lID0gbm9ybWFsaXplKG1vZHVsZVBhdGgpLnNwbGl0KCcvJykucG9wKCk7XG5cbiAgICBpZiAoaG9zdC5leGlzdHMobW9kdWxlUGF0aCkpIHtcbiAgICAgIHJldHVybiBub3JtYWxpemUobW9kdWxlUGF0aCk7XG4gICAgfSBlbHNlIGlmIChob3N0LmV4aXN0cyhtb2R1bGVQYXRoICsgJy50cycpKSB7XG4gICAgICByZXR1cm4gbm9ybWFsaXplKG1vZHVsZVBhdGggKyAnLnRzJyk7XG4gICAgfSBlbHNlIGlmIChob3N0LmV4aXN0cyhtb2R1bGVQYXRoICsgJy5tb2R1bGUudHMnKSkge1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZShtb2R1bGVQYXRoICsgJy5tb2R1bGUudHMnKTtcbiAgICB9IGVsc2UgaWYgKGhvc3QuZXhpc3RzKG1vZHVsZVBhdGggKyAnLycgKyBtb2R1bGVCYXNlTmFtZSArICcubW9kdWxlLnRzJykpIHtcbiAgICAgIHJldHVybiBub3JtYWxpemUobW9kdWxlUGF0aCArICcvJyArIG1vZHVsZUJhc2VOYW1lICsgJy5tb2R1bGUudHMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTcGVjaWZpZWQgbW9kdWxlIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdG8gZmluZCB0aGUgXCJjbG9zZXN0XCIgbW9kdWxlIHRvIGEgZ2VuZXJhdGVkIGZpbGUncyBwYXRoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZE1vZHVsZShob3N0OiBUcmVlLCBnZW5lcmF0ZURpcjogc3RyaW5nKTogUGF0aCB7XG4gIGxldCBjbG9zZXN0TW9kdWxlID0gbm9ybWFsaXplKCcvJyArIGdlbmVyYXRlRGlyKTtcbiAgY29uc3QgYWxsRmlsZXMgPSBob3N0LmZpbGVzO1xuXG4gIGxldCBtb2R1bGVQYXRoOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgY29uc3QgbW9kdWxlUmUgPSAvXFwubW9kdWxlXFwudHMkLztcbiAgY29uc3Qgcm91dGluZ01vZHVsZVJlID0gLy1yb3V0aW5nXFwubW9kdWxlXFwudHMvO1xuXG4gIHdoaWxlIChjbG9zZXN0TW9kdWxlKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGFsbEZpbGVzXG4gICAgICAuZmlsdGVyKHAgPT4gbW9kdWxlUmUudGVzdChwKSAmJlxuICAgICAgICAhcm91dGluZ01vZHVsZVJlLnRlc3QocCkgJiZcbiAgICAgICAgIS9cXC8vZy50ZXN0KHAucmVwbGFjZShjbG9zZXN0TW9kdWxlICsgJy8nLCAnJykpKTtcblxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PSAxKSB7XG4gICAgICBtb2R1bGVQYXRoID0gbWF0Y2hlc1swXTtcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSBpZiAobWF0Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vcmUgdGhhbiBvbmUgbW9kdWxlIG1hdGNoZXMuIFVzZSBza2lwLWltcG9ydCBvcHRpb24gdG8gc2tpcCBpbXBvcnRpbmcgJ1xuICAgICAgICArICd0aGUgY29tcG9uZW50IGludG8gdGhlIGNsb3Nlc3QgbW9kdWxlLicpO1xuICAgIH1cbiAgICBjbG9zZXN0TW9kdWxlID0gZGlybmFtZShjbG9zZXN0TW9kdWxlKTtcbiAgfVxuXG4gIGlmICghbW9kdWxlUGF0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgYW4gTmdNb2R1bGUgZm9yIHRoZSBuZXcgY29tcG9uZW50LiBVc2UgdGhlIHNraXAtaW1wb3J0ICdcbiAgICAgICsgJ29wdGlvbiB0byBza2lwIGltcG9ydGluZyBjb21wb25lbnRzIGluIE5nTW9kdWxlLicpO1xuICB9XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZShtb2R1bGVQYXRoKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIHJlbGF0aXZlIHBhdGggZnJvbSBvbmUgZmlsZSBwYXRoIHRvIGFub3RoZXIgZmlsZSBwYXRoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRSZWxhdGl2ZVBhdGgoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKTogc3RyaW5nIHtcbiAgZnJvbSA9IG5vcm1hbGl6ZShmcm9tKTtcbiAgdG8gPSBub3JtYWxpemUodG8pO1xuXG4gIC8vIENvbnZlcnQgdG8gYXJyYXlzLlxuICBjb25zdCBmcm9tUGFydHMgPSBmcm9tLnNwbGl0KCcvJyk7XG4gIGNvbnN0IHRvUGFydHMgPSB0by5zcGxpdCgnLycpO1xuXG4gIC8vIFJlbW92ZSBmaWxlIG5hbWVzIChwcmVzZXJ2aW5nIGRlc3RpbmF0aW9uKVxuICBmcm9tUGFydHMucG9wKCk7XG4gIGNvbnN0IHRvRmlsZU5hbWUgPSB0b1BhcnRzLnBvcCgpO1xuXG4gIGNvbnN0IHJlbGF0aXZlUGF0aCA9IHJlbGF0aXZlKG5vcm1hbGl6ZShmcm9tUGFydHMuam9pbignLycpKSwgbm9ybWFsaXplKHRvUGFydHMuam9pbignLycpKSk7XG4gIGxldCBwYXRoUHJlZml4ID0gJyc7XG5cbiAgLy8gU2V0IHRoZSBwYXRoIHByZWZpeCBmb3Igc2FtZSBkaXIgb3IgY2hpbGQgZGlyLCBwYXJlbnQgZGlyIHN0YXJ0cyB3aXRoIGAuLmBcbiAgaWYgKCFyZWxhdGl2ZVBhdGgpIHtcbiAgICBwYXRoUHJlZml4ID0gJy4nO1xuICB9IGVsc2UgaWYgKCFyZWxhdGl2ZVBhdGguc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgcGF0aFByZWZpeCA9IGAuL2A7XG4gIH1cbiAgaWYgKHBhdGhQcmVmaXggJiYgIXBhdGhQcmVmaXguZW5kc1dpdGgoJy8nKSkge1xuICAgIHBhdGhQcmVmaXggKz0gJy8nO1xuICB9XG5cbiAgcmV0dXJuIHBhdGhQcmVmaXggKyAocmVsYXRpdmVQYXRoID8gcmVsYXRpdmVQYXRoICsgJy8nIDogJycpICsgdG9GaWxlTmFtZTtcbn1cbiJdfQ==