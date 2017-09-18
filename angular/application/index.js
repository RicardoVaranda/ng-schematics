"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const schematics_1 = require("@angular-devkit/schematics");
const ts = require("typescript");
const stringUtils = require("../strings");
const ast_utils_1 = require("../utility/ast-utils");
const change_1 = require("../utility/change");
function addBootstrapToNgModule(directory, sourceDir) {
    return (host) => {
        const modulePath = `${directory}/${sourceDir}/app/app.module.ts`;
        const content = host.read(modulePath);
        if (!content) {
            throw new schematics_1.SchematicsError(`File ${modulePath} does not exist.`);
        }
        const sourceText = content.toString('utf-8');
        const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        const componentModule = './app.component';
        const importChanges = ast_utils_1.addImportToModule(source, modulePath, 'BrowserModule', '@angular/platform-browser');
        const bootstrapChanges = ast_utils_1.addBootstrapToModule(source, modulePath, 'AppComponent', componentModule);
        const changes = [
            ...importChanges,
            ...bootstrapChanges,
        ];
        const recorder = host.beginUpdate(modulePath);
        for (const change of changes) {
            if (change instanceof change_1.InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
function minimalPathFilter(path) {
    const toRemoveList = [/e2e\//, /editorconfig/, /README/, /karma.conf.js/,
        /protractor.conf.js/, /test.ts/, /tsconfig.spec.json/,
        /tslint.json/, /favicon.ico/];
    return !toRemoveList.some(re => re.test(path));
}
function default_1(options) {
    return (host, context) => {
        const appRootSelector = `${options.prefix}-root`;
        const componentOptions = !options.minimal ?
            {
                inlineStyle: options.inlineStyle,
                inlineTemplate: options.inlineTemplate,
                spec: !options.skipTests,
                styleext: options.style,
            } :
            {
                inlineStyle: true,
                inlineTemplate: true,
                spec: false,
                styleext: options.style,
            };
        const sourceDir = options.sourceDir || 'src';
        return schematics_1.chain([
            schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files'), [
                options.minimal ? schematics_1.filter(minimalPathFilter) : schematics_1.noop(),
                schematics_1.template(Object.assign({ utils: stringUtils, 'dot': '.' }, options)),
                schematics_1.move(options.directory),
            ])),
            schematics_1.schematic('module', {
                name: 'app',
                commonModule: false,
                flat: true,
                routing: options.routing,
                routingScope: 'Root',
                sourceDir: options.directory + '/' + sourceDir,
                spec: false,
            }),
            schematics_1.schematic('component', Object.assign({ name: 'app', selector: appRootSelector, sourceDir: options.directory + '/' + sourceDir, flat: true }, componentOptions)),
            addBootstrapToNgModule(options.directory, sourceDir),
            schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./other-files'), [
                componentOptions.inlineTemplate ? schematics_1.filter(path => !path.endsWith('.html')) : schematics_1.noop(),
                !componentOptions.spec ? schematics_1.filter(path => !path.endsWith('.spec.ts')) : schematics_1.noop(),
                schematics_1.template(Object.assign({ utils: stringUtils }, options, { selector: appRootSelector }, componentOptions)),
                schematics_1.move(options.directory + '/' + sourceDir + '/app'),
            ]), schematics_1.MergeStrategy.Overwrite),
        ])(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JpY2FyZG9fdmFyYW5kYS9Qcm9qZWN0cy9kZXZraXQvIiwic291cmNlcyI6WyJwYWNrYWdlcy9zY2hlbWF0aWNzL2FuZ3VsYXIvYXBwbGljYXRpb24vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwyREFlb0M7QUFDcEMsaUNBQWlDO0FBQ2pDLDBDQUEwQztBQUMxQyxvREFBK0U7QUFDL0UsOENBQWlEO0FBSWpELGdDQUFnQyxTQUFpQixFQUFFLFNBQWlCO0lBQ2xFLE1BQU0sQ0FBQyxDQUFDLElBQVU7UUFDaEIsTUFBTSxVQUFVLEdBQUcsR0FBRyxTQUFTLElBQUksU0FBUyxvQkFBb0IsQ0FBQztRQUNqRSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNiLE1BQU0sSUFBSSw0QkFBZSxDQUFDLFFBQVEsVUFBVSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFDRCxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXpGLE1BQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDO1FBRTFDLE1BQU0sYUFBYSxHQUFHLDZCQUFpQixDQUFDLE1BQU0sRUFDTixVQUFVLEVBQ1YsZUFBZSxFQUNmLDJCQUEyQixDQUFDLENBQUM7UUFDckUsTUFBTSxnQkFBZ0IsR0FBRyxnQ0FBb0IsQ0FBQyxNQUFNLEVBQ04sVUFBVSxFQUNWLGNBQWMsRUFDZCxlQUFlLENBQUMsQ0FBQztRQUMvRCxNQUFNLE9BQU8s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RCxzQkFBUyxDQUNQLGtCQUFLLENBQUMsZ0JBQUcsQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDMUIsZ0JBQWdCLENBQUMsY0FBYyxHQUFHLG1CQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLGlCQUFJLEVBQUU7Z0JBQ2xGLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLG1CQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLGlCQUFJLEVBQUU7Z0JBQzVFLHFCQUFRLGlCQUNOLEtBQUssRUFBRSxXQUFXLElBQ2YsT0FBYyxJQUNqQixRQUFRLEVBQUUsZUFBZSxJQUN0QixnQkFBZ0IsRUFDbkI7Z0JBQ0YsaUJBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsTUFBTSxDQUFDO2FBQ25ELENBQUMsRUFBRSwwQkFBYSxDQUFDLFNBQVMsQ0FBQztTQUMvQixDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQztBQUNKLENBQUM7QUE1REQsNEJBNERDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtcbiAgTWVyZ2VTdHJhdGVneSxcbiAgUnVsZSxcbiAgU2NoZW1hdGljQ29udGV4dCxcbiAgU2NoZW1hdGljc0Vycm9yLFxuICBUcmVlLFxuICBhcHBseSxcbiAgY2hhaW4sXG4gIGZpbHRlcixcbiAgbWVyZ2VXaXRoLFxuICBtb3ZlLFxuICBub29wLFxuICBzY2hlbWF0aWMsXG4gIHRlbXBsYXRlLFxuICB1cmwsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0ICogYXMgc3RyaW5nVXRpbHMgZnJvbSAnLi4vc3RyaW5ncyc7XG5pbXBvcnQgeyBhZGRCb290c3RyYXBUb01vZHVsZSwgYWRkSW1wb3J0VG9Nb2R1bGUgfSBmcm9tICcuLi91dGlsaXR5L2FzdC11dGlscyc7XG5pbXBvcnQgeyBJbnNlcnRDaGFuZ2UgfSBmcm9tICcuLi91dGlsaXR5L2NoYW5nZSc7XG5pbXBvcnQgeyBTY2hlbWEgYXMgQXBwbGljYXRpb25PcHRpb25zIH0gZnJvbSAnLi9zY2hlbWEnO1xuXG5cbmZ1bmN0aW9uIGFkZEJvb3RzdHJhcFRvTmdNb2R1bGUoZGlyZWN0b3J5OiBzdHJpbmcsIHNvdXJjZURpcjogc3RyaW5nKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSkgPT4ge1xuICAgIGNvbnN0IG1vZHVsZVBhdGggPSBgJHtkaXJlY3Rvcnl9LyR7c291cmNlRGlyfS9hcHAvYXBwLm1vZHVsZS50c2A7XG4gICAgY29uc3QgY29udGVudCA9IGhvc3QucmVhZChtb2R1bGVQYXRoKTtcbiAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXJyb3IoYEZpbGUgJHttb2R1bGVQYXRofSBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICB9XG4gICAgY29uc3Qgc291cmNlVGV4dCA9IGNvbnRlbnQudG9TdHJpbmcoJ3V0Zi04Jyk7XG4gICAgY29uc3Qgc291cmNlID0gdHMuY3JlYXRlU291cmNlRmlsZShtb2R1bGVQYXRoLCBzb3VyY2VUZXh0LCB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LCB0cnVlKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudE1vZHVsZSA9ICcuL2FwcC5jb21wb25lbnQnO1xuXG4gICAgY29uc3QgaW1wb3J0Q2hhbmdlcyA9IGFkZEltcG9ydFRvTW9kdWxlKHNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0Jyb3dzZXJNb2R1bGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlcicpO1xuICAgIGNvbnN0IGJvb3RzdHJhcENoYW5nZXMgPSBhZGRCb290c3RyYXBUb01vZHVsZShzb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBcHBDb21wb25lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRNb2R1bGUpO1xuICAgIGNvbnN0IGNoYW5nZXMgPSBbXG4gICAgICAuLi5pbXBvcnRDaGFuZ2VzLFxuICAgICAgLi4uYm9vdHN0cmFwQ2hhbmdlcyxcbiAgICBdO1xuXG4gICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKG1vZHVsZVBhdGgpO1xuICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbiAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbiAgICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuICAgICAgfVxuICAgIH1cbiAgICBob3N0LmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG5cbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbWluaW1hbFBhdGhGaWx0ZXIocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IHRvUmVtb3ZlTGlzdDogUmVnRXhwW10gPSBbL2UyZVxcLy8sIC9lZGl0b3Jjb25maWcvLCAvUkVBRE1FLywgL2thcm1hLmNvbmYuanMvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9wcm90cmFjdG9yLmNvbmYuanMvLCAvdGVzdC50cy8sIC90c2NvbmZpZy5zcGVjLmpzb24vLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC90c2xpbnQuanNvbi8sIC9mYXZpY29uLmljby9dO1xuXG4gIHJldHVybiAhdG9SZW1vdmVMaXN0LnNvbWUocmUgPT4gcmUudGVzdChwYXRoKSk7XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob3B0aW9uczogQXBwbGljYXRpb25PcHRpb25zKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IGFwcFJvb3RTZWxlY3RvciA9IGAke29wdGlvbnMucHJlZml4fS1yb290YDtcbiAgICBjb25zdCBjb21wb25lbnRPcHRpb25zID0gIW9wdGlvbnMubWluaW1hbCA/XG4gICAgICB7XG4gICAgICAgIGlubGluZVN0eWxlOiBvcHRpb25zLmlubGluZVN0eWxlLFxuICAgICAgICBpbmxpbmVUZW1wbGF0ZTogb3B0aW9ucy5pbmxpbmVUZW1wbGF0ZSxcbiAgICAgICAgc3BlYzogIW9wdGlvbnMuc2tpcFRlc3RzLFxuICAgICAgICBzdHlsZWV4dDogb3B0aW9ucy5zdHlsZSxcbiAgICAgIH0gOlxuICAgICAge1xuICAgICAgICBpbmxpbmVTdHlsZTogdHJ1ZSxcbiAgICAgICAgaW5saW5lVGVtcGxhdGU6IHRydWUsXG4gICAgICAgIHNwZWM6IGZhbHNlLFxuICAgICAgICBzdHlsZWV4dDogb3B0aW9ucy5zdHlsZSxcbiAgICAgIH07XG4gICAgY29uc3Qgc291cmNlRGlyID0gb3B0aW9ucy5zb3VyY2VEaXIgfHwgJ3NyYyc7XG5cbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgbWVyZ2VXaXRoKFxuICAgICAgICBhcHBseSh1cmwoJy4vZmlsZXMnKSwgW1xuICAgICAgICAgIG9wdGlvbnMubWluaW1hbCA/IGZpbHRlcihtaW5pbWFsUGF0aEZpbHRlcikgOiBub29wKCksXG4gICAgICAgICAgdGVtcGxhdGUoe1xuICAgICAgICAgICAgdXRpbHM6IHN0cmluZ1V0aWxzLFxuICAgICAgICAgICAgJ2RvdCc6ICcuJyxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMgYXMgb2JqZWN0LFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIG1vdmUob3B0aW9ucy5kaXJlY3RvcnkpLFxuICAgICAgICBdKSksXG4gICAgICBzY2hlbWF0aWMoJ21vZHVsZScsIHtcbiAgICAgICAgbmFtZTogJ2FwcCcsXG4gICAgICAgIGNvbW1vbk1vZHVsZTogZmFsc2UsXG4gICAgICAgIGZsYXQ6IHRydWUsXG4gICAgICAgIHJvdXRpbmc6IG9wdGlvbnMucm91dGluZyxcbiAgICAgICAgcm91dGluZ1Njb3BlOiAnUm9vdCcsXG4gICAgICAgIHNvdXJjZURpcjogb3B0aW9ucy5kaXJlY3RvcnkgKyAnLycgKyBzb3VyY2VEaXIsXG4gICAgICAgIHNwZWM6IGZhbHNlLFxuICAgICAgfSksXG4gICAgICBzY2hlbWF0aWMoJ2NvbXBvbmVudCcsIHtcbiAgICAgICAgbmFtZTogJ2FwcCcsXG4gICAgICAgIHNlbGVjdG9yOiBhcHBSb290U2VsZWN0b3IsXG4gICAgICAgIHNvdXJjZURpcjogb3B0aW9ucy5kaXJlY3RvcnkgKyAnLycgKyBzb3VyY2VEaXIsXG4gICAgICAgIGZsYXQ6IHRydWUsXG4gICAgICAgIC4uLmNvbXBvbmVudE9wdGlvbnMsXG4gICAgICB9KSxcbiAgICAgIGFkZEJvb3RzdHJhcFRvTmdNb2R1bGUob3B0aW9ucy5kaXJlY3RvcnksIHNvdXJjZURpciksXG4gICAgICBtZXJnZVdpdGgoXG4gICAgICAgIGFwcGx5KHVybCgnLi9vdGhlci1maWxlcycpLCBbXG4gICAgICAgICAgY29tcG9uZW50T3B0aW9ucy5pbmxpbmVUZW1wbGF0ZSA/IGZpbHRlcihwYXRoID0+ICFwYXRoLmVuZHNXaXRoKCcuaHRtbCcpKSA6IG5vb3AoKSxcbiAgICAgICAgICAhY29tcG9uZW50T3B0aW9ucy5zcGVjID8gZmlsdGVyKHBhdGggPT4gIXBhdGguZW5kc1dpdGgoJy5zcGVjLnRzJykpIDogbm9vcCgpLFxuICAgICAgICAgIHRlbXBsYXRlKHtcbiAgICAgICAgICAgIHV0aWxzOiBzdHJpbmdVdGlscyxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMgYXMgYW55LCAgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1hbnlcbiAgICAgICAgICAgIHNlbGVjdG9yOiBhcHBSb290U2VsZWN0b3IsXG4gICAgICAgICAgICAuLi5jb21wb25lbnRPcHRpb25zLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIG1vdmUob3B0aW9ucy5kaXJlY3RvcnkgKyAnLycgKyBzb3VyY2VEaXIgKyAnL2FwcCcpLFxuICAgICAgICBdKSwgTWVyZ2VTdHJhdGVneS5PdmVyd3JpdGUpLFxuICAgIF0pKGhvc3QsIGNvbnRleHQpO1xuICB9O1xufVxuIl19