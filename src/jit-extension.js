/*==================================================
 *  Simile Exhibit Jit Extension
 *==================================================
 */

Exhibit.onjQueryLoaded(function() {
    var isCompiled = ("Exhibit_JitExtension_isCompiled" in window) && 
                    window.Exhibit_JitExtension_isCompiled;
                    
    Exhibit.JitExtension = {
        params: {
            bundle: true
        } 
    };

    var javascriptFiles = [
        "force.js"
    ];

    var javascriptLibs = [
                    "jit.js"
                    ];

    var cssFiles = [
        "forceDirected.css"
    ]
    
    var paramTypes = { bundle: Boolean };
    if (typeof Exhibit_JitExtension_urlPrefix == "string") {
        Exhibit.JitExtension.urlPrefix = Exhibit_JitExtension_urlPrefix;
        if ("Exhibit_JitExtension_parameters" in window) {
            Exhibit.parseURLParameters(Exhibit_JitExtension_parameters,
                                          Exhibit.JitExtension.params,
                                          paramTypes);
        }
    } else {
        var url = Exhibit.findScript(document, "/jit-extension.js");
        if (url == null) {
            Exhibit.Debug.exception(new Error("Failed to derive URL prefix for Simile Exhibit Jit Extension code files"));
            return;
        }
        Exhibit.JitExtension.urlPrefix = url.substr(0, url.indexOf("jit-extension.js"));
        
        Exhibit.parseURLParameters(url, Exhibit.JitExtension.params, paramTypes);
    }
    
    var scriptURLs = [];
    var cssURLs = [];
    
    if (Exhibit.JitExtension.params.bundle) {
        scriptURLs.push(Exhibit.JitExtension.urlPrefix + "jit-extension-bundle.js");
        cssURLs.push(Exhibit.JitExtension.urlPrefix + "styles/jit-extension-bundle.css");
    } else {
        Exhibit.prefixURLs(scriptURLs, Exhibit.JitExtension.urlPrefix + "lib/", javascriptLibs);
        Exhibit.prefixURLs(scriptURLs, Exhibit.JitExtension.urlPrefix + "scripts/", javascriptFiles);
        Exhibit.prefixURLs(cssURLs, Exhibit.JitExtension.urlPrefix + "styles/", cssFiles);
    }
    
    for (var i = 0; i < Exhibit.locales.length; i++) {
        scriptURLs.push(Exhibit.JitExtension.urlPrefix + "locales/" + Exhibit.locales[i] + "/jit-locale.js");
    };
    
    if (!isCompiled) {
        Exhibit.includeJavascriptFiles("", scriptURLs, false);
        Exhibit.includeCssFiles(document, "", cssURLs);
    }

    /**
     * @static
     * @public
     * @param {jQuery.Event} evt
     * @param {extensionRegistry: []} reg
     */
    Exhibit.JitExtension.registerExtension = function(evt, reg) {
        if ($.inArray('JitExtension', reg.extensionRegistry) < 0) {
            reg.extensionRegistry.push('JitExtension');
        }
    };

    Exhibit.jQuery(document).on("registerExtensions.exhibit", Exhibit.JitExtension.registerExtension);

    Exhibit.JitExtension._extensionSpecs = {
        viewSpecs: {
            "ForceDirectedView": {}
        },
        documentation: ' \
        <div id="intro"> \
            We are using the <a href="http://philogb.github.io/jit/">JavaScript Infovis Toolkit (JIT)</a> to construct this view. \
        </div>\
            <p>To add JIT force directed view to your exhibit, you must include JIT library and the exhibit extension for JIT(in addition to the Exhibit API): \
            </p> \
        <div class="border"> \
            <pre> &lt;link rel="exhibit-extension" src=<a href="http://projects.csail.mit.edu/exhibit/api/extensions/jit/jit-extension.js">"http://projects.csail.mit.edu/exhibit/api/extensions/jit/jit-extension.js"</a>/&gt; \
            </pre> \
        </div>'
    }
});
