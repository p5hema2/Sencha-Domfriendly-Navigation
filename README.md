Sencha-Domfriendly-Navigation
=============================

version 1.0.1
based on Sencha Touch 2.2.0 && 2.3
written by [Martin Hess](https://github.com/p5hema2)

tested against:   
- Sencha Touch 2.2.0b1  
- Sencha Touch 2.2.0b2  
- Sencha Touch 2.2.0rc  
- Sencha Touch 2.2.0
- Sencha Touch 2.2.1
- Sencha Touch 2.3.0
- Sencha Touch 2.3.1

## changes to Version 0.1.0

- removed to create views by alias, views are created by xtype instead

## About:

A problem of the navigation in Sencha is, that it is not really DOM-friendly.  
So i have written this Navigation based on Sencha Touch 2.2, which removes old views from the DOM upon Navigation and recreates them on backtap.

## Usage:


- copy the DomFriendlyNavigationView.js to "./ux/touch/"

- add ",${app.dir}/ux/touch" to "./.sencha/app/sencha/cfg" to variable "app.classpath" 
(builder needs to know where the plugin is located)

```
app.classpath=${app.dir}/app.js,${app.dir}/app,${app.dir}/ux/touch
```

- load your the file in your "./app.js"

```javascript
    Ext.Loader.setPath({
    	'Ext': 'touch/src',
    	'Ext.ux.touch': 'ux/touch',
    	...
    });
```
- create a NavigationView and extend from "Ext.ux.touch.DomFriendlyNavigationView" instead of "Ext.navigation.View"
or use the "xtype: 'mhnavigationview" instead of "navigationview".

- create some Views and give them an "xtype" like "MyView1"

- add Views to the Navigation like this.

```javascript
    this.getMyNavigation().push(
    	Ext.widget(
    		'MyView',
    		{
    			myInitaloption1: 'foo',
    			myInitaloption1: 'bar',
    			...
    		}
    	)
    ); 
```
- push more than one View to the Navigation

- Look at the DOM, you will see only the active View is in DOM the rest is removed.

- hit the "Back" button, the previous view will be recreated before the active view and the active view will pop

- Enjoy!


### Pro:


- your DOM will remove the previous views upon deeper navigation

### Cons:

- previous view doesn't save there scroll position or something else, cause they are new created
(you can save them manualy in the controller on "view --> event --> hide" and add them values onShow again)

Example Scroller:

```javascript
    /**
     * this :  is the controller for the view in this case the view is a list
     * this.scrollY is a local variable in the controller to save the scrollposition outside the view
     * 
     * p.s. you have to define the listener for VIEW.on('show', this.onShow, this) and respective hide beforehand of course
     */
    onHide: function() {
        this.scrollY = Math.abs(this.getList().getScrollable().getScroller().getTranslatable().y);
    },

    onShow: function() {
        this.getList().getScrollable().getScroller().setInitialOffset({ x: 0, y: this.scrollY ? this.scrollY : 0})
    },
```

<br><br>
Greetings,  
[Martin Hess](https://github.com/p5hema2)  

### Don't forget to star the repo. :-)
