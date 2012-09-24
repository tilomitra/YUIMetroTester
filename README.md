YUIMetroTester
==============

YUIMetroTester is a sample WinJS project with YUI3. It was made to help run YUI3 unit tests in the WinJS enviroment. 
It does this by using a packaged version of yui3 inside the project's js/ directory.

Setting up
----------

To save on the repo size and to keep the repo up-to-date, yui3 is not part of this repo. So if you just clone this repo and try to build it, it won't work.
That's normal. Here's what you have to do:

* Clone the repo.
* Navigate in to the js/ folder.
* Clone yui3/ from the YUI3 repo in here. (http://github.com/yui/yui3)
* Try building.


Help! I'm still having issues
-----------------------------

If you still get errors saying `YUI() is undefined`, it probably means you have YUI inside the directory, but you still need to include it in your project in Visual Studio.

To do this, go into the VS Solution Explorer, and click the little icon on the top that says "Show All Files". 
You should now see the yui3/ directory inside the js/ folder. Folders that are in the directory but not part of the project show up with a dotted icon. Your yui3/ directory may have a dotted icon.

* To include it in your project, expand the folder inside the Solution Explorer and right-click on the build/ directory. 
* Click "Include in Project". This will take a minute or two.
* Next, do the same with the src/ directory. 
* Try re-building. Restart Visual Studio to be safe, because sometimes it doesn't refresh the project directory immediately.


Still not working? Send me an email (tilomitra@gmail.com) or add an issue to this repo.