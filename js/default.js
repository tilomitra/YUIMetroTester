// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";
    WinJS.strictProcessing();
    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var scenarios = [
        { url: '/js/yui3/src/event/tests/unit/event-synthetic.html', title: "event-synthetic" },
        { url: '/js/yui3/src/event/tests/unit/event-touch.html', title: "event-touch" }
    ];
    WinJS.Namespace.define("WinJSTestApp", {
        sampleTitle: "WINJS Test App",
        scenarios: scenarios
    });

    var currentScenario = 0;
    var isRunnerSetup = false;

    var completedTestCases = [];

    var setUpRunner = function (runner) {

        runner.subscribe(runner.TEST_SUITE_BEGIN_EVENT, function (o) {
            console.log("Test Case beginning");
            if (completedTestCases[o.testName]) {
                console.log("The test with name: " + o.testName + "has already been tested");
            }


        });

        runner.subscribe(runner.TEST_SUITE_COMPLETE_EVENT, function (o) {

            

            console.log("Finished running Test Case with name: " + o.results.name);
            console.log("Total Tests: " + o.results.total);
            console.log("Failed Tests: " + o.results.failed);
            console.log("Passed Tests: " + o.results.passed);
            console.log("Ignored Tests: " + o.results.ignored);

            currentScenario++;
            if (scenarios[currentScenario]) {

                WinJS.Navigation.navigate(scenarios[currentScenario].url);

            }
            else {
                console.log("Finished Running all Scenarios");
            }
        });

        isRunnerSetup = true;

    }

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                //var pckg = Windows.ApplicationModel.Package.current;
                //var installedLocation = pckg.installedLocation;
                //var url = scenarios[currentScenario].url;
                //return WinJS.Navigation.navigate(url);
            }));
        }
    };

    //var getUnitTestFiles = function (folder) {
    //    var installedLocationPath = Windows.ApplicationModel.Package.current.installedLocation.path;
    //    folder.getFoldersAsync().done(function (folders) {

    //        folders.forEach(function (f, i) {

    //            //for each folder, get the html file(s) inside tests/unit
    //            f.getFolderAsync('tests').done(function (tests) {

    //                tests.getFolderAsync('unit').done(function (unit) {

    //                    unit.getFilesAsync().done(function (files) {

    //                        var title = document.createElement('h2');
    //                        title.innerHTML = f.displayName;
    //                        document.getElementById('menu').appendChild(title);

    //                        files.forEach(function (e, i) {
    //                            //Create a link to the test
    //                            var a = document.createElement('a');
    //                            a.setAttribute('href', e.path.substring(installedLocationPath.length));
    //                            a.setAttribute('class', 'test-link');
    //                            a.innerHTML = e.displayName;
    //                            document.getElementById('menu').appendChild(a);
    //                            document.getElementById('menu').appendChild(document.createElement('br'));

    //                        });
    //                    });
    //                },

    //                function (error) {
    //                    console.log("Tests Folder with path: " + tests.path.substring(installedLocationPath.length) + " has no unit/ directory");
    //                });

    //            }, 
                
    //            function (error) {
    //                console.log("Folder with name: " + folder.path.substring(installedLocationPath.length) + " has no tests/ directory");
    //            });

    //        });

    //    });

    //}

    WinJS.Navigation.addEventListener("navigated", function (eventObject) {

        var url = eventObject.detail.location;
        var host = document.getElementById('wrapper');
        WinJS.Utilities.empty(host);
        WinJS.UI.Pages.render(url, host, eventObject.detail.state).then(function () {
            console.log("Loaded. Running Tests for " + url + '...');
            var intId = window.setInterval(function () {
                if (YUI.YUITest || isRunnerSetup) {
                    window.clearInterval(intId);

                    if (!isRunnerSetup) {
                        setUpRunner(YUI.YUITest.TestRunner);
                    }
                }
            }, 500);
        });
    });


    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
