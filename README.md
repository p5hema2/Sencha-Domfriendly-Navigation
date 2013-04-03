Sencha-Domfriendly-Navigation
=============================

version 0.1.0  
based on Sencha Touch 2.2.0b1  
written by [Martin Heﬂ](https://github.com/p5hema2)

tested against:   
- Sencha Touch 2.2.0b1  
- Sencha Touch 2.2.0b2   

## About:

A problem of the navigation in Sencha is, that it is not really DOM-friendly.  
So i have written this Navigation based on Sencha Touch 2.2, which removes old views from the DOM upon Navigation and recreates them on backtap.

## Usage:


- copy the MhNavigationView.js to "./ux/touch/"
- load your the file in your "./app.js"

```javascript
    Ext.Loader.setPath({
    	'Ext': 'touch/src',
    	'Ext.ux.touch': 'ux/touch',
    	...
    });
```
- create a NavigationView and extend from "Ext.ux.touch.MhNavigationView" instead of "Ext.navigation.View"
or use the "xtype: 'mhnavigationview" instead of "navigationview".

- create some Views and give them an "alias" like "MyView1"

- add Views to the Navigation like this.

```javascript
    this.getMyNavigation().push(
    	Ext.createByAlias(
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

<br><br>
Greetings,  
[Martin Heﬂ](https://github.com/p5hema2)
### Don't forget to star the repo. :-)