/**
 * Dom Friendly Navigation View
 * based on sencha touch 2.2.0 beta 1
 * 
 * I have commentet out the orginal code from Sencha. You are free to remove it. It is not written by me.
 * 
 * @class Ext.ux.touch.DomFriendlyNavigationView
 * @version 1.0.1
 * @author Martin Hess <https://github.com/p5hema2>
 */
Ext.define('Ext.ux.touch.DomFriendlyNavigationView', {
	extend : 'Ext.navigation.View',
	xtype : 'domfriendlynavigationview',
	
	config: {
//	    /**
//	     * @cfg
//	     * @inheritdoc
//	     */
//        baseCls: Ext.baseCSSPrefix + 'domfriendlynavigationview',
//
//        /**
//         * @cfg {Boolean/Object} navigationBar
//         * The NavigationBar used in this navigation view. It defaults to be docked to the top.
//         *
//         * You can just pass in a normal object if you want to customize the NavigationBar. For example:
//         *
//         *     navigationBar: {
//         *         ui: 'dark',
//         *         docked: 'bottom'
//         *     }
//         *
//         * You **cannot** specify a *title* property in this configuration. The title of the navigationBar is taken
//         * from the configuration of this views children:
//         *
//         *     view.push({
//         *         title: 'This views title which will be shown in the navigation bar',
//         *         html: 'Some HTML'
//         *     });
//         *
//         * @accessor
//         */
//        navigationBar: {
//            docked: 'top'
//        },
//
//        /**
//         * @cfg {String} defaultBackButtonText
//         * The text to be displayed on the back button if:
//         *
//         * - The previous view does not have a title.
//         * - The {@link #useTitleForBackButtonText} configuration is `true`.
//         * @accessor
//         */
//        defaultBackButtonText: 'Back',
//
//        /**
//         * @cfg {Boolean} useTitleForBackButtonText
//         * Set to `false` if you always want to display the {@link #defaultBackButtonText} as the text
//         * on the back button. `true` if you want to use the previous views title.
//         * @accessor
//         */
//        useTitleForBackButtonText: false,
//
//        /**
//         * @cfg {Array/Object} items The child items to add to this NavigationView. This is usually an array of Component
//         * configurations or instances, for example:
//         *
//         *     Ext.create('Ext.Container', {
//         *         items: [
//         *             {
//         *                 xtype: 'panel',
//         *                 title: 'My title',
//         *                 html: 'This is an item'
//         *             }
//         *         ]
//         *     });
//         *
//         * If you want a title to be displayed in the {@link #navigationBar}, you must specify a `title` configuration in your
//         * view, like above.
//         *
//         * __Note:__ Only one view will be visible at a time. If you want to change to another view, use the {@link #method-push} or
//         * {@link #setActiveItem} methods.
//         * @accessor
//         */
//
//        /**
//         * @cfg
//         * @hide
//         */
//        layout: {
//            type: 'card',
//            animation: {
//                duration: 300,
//                easing: 'ease-out',
//                type: 'slide',
//                direction: 'left'
//            }
//        },
//
//        // See https://sencha.jira.com/browse/TOUCH-1568
//        // If you do, add to #navigationBar config docs:
//        //
//        //     If you want to add a button on the right of the NavigationBar,
//        //     use the {@link #rightButton} configuration.
        
        /*
         * modification start
         */
        /**
         * used to save previos views and records
         */
        historyStack: []
        /*
         * modification end
         */
    },

//    /**
//     * @event push
//     * Fires when a view is pushed into this navigation view
//     * @param {Ext.navigation.View} this The component instance
//     * @param {Mixed} view The view that has been pushed
//     */
//
//    /**
//     * @event pop
//     * Fires when a view is popped from this navigation view
//     * @param {Ext.navigation.View} this The component instance
//     * @param {Mixed} view The view that has been popped
//     */
//
//    /**
//     * @event back
//     * Fires when the back button in the navigation view was tapped.
//     * @param {Ext.navigation.View} this The component instance\
//     */
//
//    // @private
//    initialize: function() {
//        var me     = this,
//            navBar = me.getNavigationBar();
//
//        //add a listener onto the back button in the navigationbar
//        navBar.on({
//            back: me.onBackButtonTap,
//            scope: me
//        });
//
//        me.relayEvents(navBar, 'rightbuttontap');
//
//        me.relayEvents(me, {
//            add: 'push',
//            remove: 'pop'
//        });
//
//        //<debug>
//        var layout = me.getLayout();
//        if (layout && !layout.isCard) {
//            Ext.Logger.error('The base layout for a NavigationView must always be a Card Layout');
//        }
//        //</debug>
//    },
//
//    /**
//     * @private
//     */
//    applyLayout: function(config) {
//        config = config || {};
//
//        return config;
//    },
//	
//    /**
//     * @private
//     * Called when the user taps on the back button
//     */
//    onBackButtonTap: function() {
//        this.pop();
//        this.fireEvent('back', this);
//    },

    /**
     * Pushes a new view into this navigation view using the default animation that this view has.
     * @param {Object} view The view to push.
     * @return {Ext.Component} The new item you just pushed.
     */
    push: function(view) {
        /*
         * modification start
         */
        var obj = {};

        // get view xtype
        obj.xtype = view.xtype
        
        // get view initialconfig
        obj.args = view.initialConfig
        
        // store in historystack
        this.getHistoryStack().push(obj)
        /*
         * modification end
         */
        return this.add(view);
    },
    
    /**
     * Removes the current active view from the stack and sets the previous view using the default animation
     * of this view.
     * @param {Number} count The number of views you want to pop.
     * @return {Ext.Component} The new active item.
     */
    pop: function(count) {
        /*
         * modification start
         */
    	// throw error if user doesn't pass nothing or a number and cancel pop
	    if (!(count == undefined || typeof count === 'number')) {
	    	console.error('Passing {@link Ext.ComponentQuery} selector to navigationview.pop is not supportet in this version. Please pass a number or nothing.')
	    	return
	    }
	    count = undefined;
        /*
         * modification end
         */
        if (this.beforePop(count)) {
            return this.doPop();
        }
    },

    /**
     * @private
     * Calculates whether it needs to remove any items from the stack when you are popping more than 1
     * item. If it does, it removes those views from the stack and returns `true`.
     * @return {Boolean} `true` if it has removed views.
     */
    beforePop: function(count) {
        var me = this,
            innerItems = me.getInnerItems();
        /*
         * modification start
         */
        var historyStack = this.getHistoryStack(),
            i,
            view;
            
        // set count to 1 if undefined
        if (count == undefined) { count = 1 }
        
        // get max numbers of views to pop (e.g. if user wants pop 5 but only 3 left he pops 3)
        i = Math.min(count, historyStack.length - 1)
        
        // cancel if historyStack - pop count <= 1, there is nothing left to display
        if (historyStack.length == 1 || historyStack.length - i < 1) {
            return false
        }    
        
        // add empty innerItems and pop views from historystack if user pops mor than 1 view
        for (i; i > 1; i--) {
            innerItems.splice(0,0,{})
            historyStack.pop()  
        }
        
        // create and add view to navigation as first innerItem
        view = Ext.widget(historyStack[historyStack.length-2].xtype,historyStack[historyStack.length-2].args)
        this.insertFirst(view);
        
        // pop current view from historystack
        historyStack.pop();
        /*
         * modification end
         */
        if (Ext.isString(count) || Ext.isObject(count)) {
            var last = innerItems.length - 1,
                i;

            for (i = last; i >= 0; i--) {
                if ((Ext.isString(count) && Ext.ComponentQuery.is(innerItems[i], count)) || (Ext.isObject(count) && count == innerItems[i])) {
                    count = last - i;
                    break;
                }
            }

            if (!Ext.isNumber(count)) {
                return false;
            }
        }

        var ln = innerItems.length,
            toRemove;

        //default to 1 pop
        if (!Ext.isNumber(count) || count < 1) {
            count = 1;
        }

        //check if we are trying to remove more items than we have
        count = Math.min(count, ln - 1);

        if (count) {
            //we need to reset the backButtonStack in the navigation bar
            me.getNavigationBar().beforePop(count);

            //get the items we need to remove from the view and remove theme
            toRemove = innerItems.splice(-count, count - 1);
            for (i = 0; i < toRemove.length; i++) {
                this.remove(toRemove[i]);
            }

            return true;
        }

        return false;
    },

//    /**
//     * @private
//     */
//    doPop: function() {
//        var me = this,
//            innerItems = this.getInnerItems();
//
//        //set the new active item to be the new last item of the stack
//        me.remove(innerItems[innerItems.length - 1]);
//        return this.getActiveItem();
//    },
//
//    /**
//     * Returns the previous item, if one exists.
//     * @return {Mixed} The previous view
//     */
//    getPreviousItem: function() {
//        var innerItems = this.getInnerItems();
//        return innerItems[innerItems.length - 2];
//    },
//
//    /**
//     * Updates the backbutton text accordingly in the {@link #navigationBar}
//     * @private
//     */
//    updateUseTitleForBackButtonText: function(useTitleForBackButtonText) {
//        var navigationBar = this.getNavigationBar();
//        if (navigationBar) {
//            navigationBar.setUseTitleForBackButtonText(useTitleForBackButtonText);
//        }
//    },
//
//    /**
//     * Updates the backbutton text accordingly in the {@link #navigationBar}
//     * @private
//     */
//    updateDefaultBackButtonText: function(defaultBackButtonText) {
//        var navigationBar = this.getNavigationBar();
//        if (navigationBar) {
//            navigationBar.setDefaultBackButtonText(defaultBackButtonText);
//        }
//    },
//
//    // @private
//    applyNavigationBar: function(config) {
//        if (!config) {
//            config = {
//                hidden: true,
//                docked: 'top'
//            };
//        }
//
//        if (config.title) {
//            delete config.title;
//            //<debug>
//            Ext.Logger.warn("Ext.navigation.View: The 'navigationBar' configuration does not accept a 'title' property. You " +
//                            "set the title of the navigationBar by giving this navigation view's children a 'title' property.");
//            //</debug>
//        }
//
//        config.view = this;
//        config.useTitleForBackButtonText = this.getUseTitleForBackButtonText();
//
//        return Ext.factory(config, Ext.navigation.Bar, this.getNavigationBar());
//    },
//
//    // @private
//    updateNavigationBar: function(newNavigationBar, oldNavigationBar) {
//        if (oldNavigationBar) {
//            this.remove(oldNavigationBar, true);
//        }
//
//        if (newNavigationBar) {
//            this.add(newNavigationBar);
//        }
//    },

    /**
     * @private
     */
    applyActiveItem: function(activeItem, currentActiveItem) {
        /*
         * modification start
         */
    	// add erasedlistener to currentActiveItem. Item will be destroyed after it is no longer visiible.
         
    	// get indexes
        var activeItemIndex,
            currentActiveItemIndex;
            
        if (activeItem == undefined || typeof activeItem === 'number') {
            activeItemIndex = activeItem
        } else {
            activeItemIndex = this.getInnerItems().indexOf(activeItem)
        }
        if (currentActiveItem == undefined || typeof activeItem === 'number') {
            currentActiveItemIndex = currentActiveItem
        } else {
            currentActiveItemIndex = this.getInnerItems().indexOf(currentActiveItem)
        }
        
        // if new view behind active view (in case of push) add destroy listener, if not let orginial behave handle the destroy (in case of pop)
        if (activeItemIndex != undefined && currentActiveItemIndex != undefined && activeItemIndex > currentActiveItemIndex) {
            currentActiveItem.on(
                'erased',
                function() {
                    currentActiveItem.destroy()
                },
                {
                    single: true
                }
            )
        }
        /*
         * modification end
         */
        var me = this,
            innerItems = me.getInnerItems();

        // Make sure the items are already initialized
        me.getItems();

        // If we are not initialzed yet, we should set the active item to the last item in the stack
        if (!me.initialized) {
            activeItem = innerItems.length - 1;
        }

        return this.callParent([activeItem, currentActiveItem]);
    },

//    doResetActiveItem: function(innerIndex) {
//        var me = this,
//            innerItems = me.getInnerItems(),
//            animation = me.getLayout().getAnimation();
//
//        if (innerIndex > 0) {
//            if (animation && animation.isAnimation) {
//                animation.setReverse(true);
//            }
//            me.setActiveItem(innerIndex - 1);
//            me.getNavigationBar().onViewRemove(me, innerItems[innerIndex], innerIndex);
//        }
//    },
//
//    /**
//     * @private
//     */
//    doRemove: function() {
//        var animation = this.getLayout().getAnimation();
//
//        if (animation && animation.isAnimation) {
//            animation.setReverse(false);
//        }
//
//        this.callParent(arguments);
//    },
//
    /**
     * @private
     */
    onItemAdd: function(item, index) {
        this.doItemLayoutAdd(item, index);
        /*
         * modification start
         */
        // return here in case of pop to have the right animation, and prevent add event from fireing
        if (this.getInnerItems().length > index + 1) {
            return
        }
        /*
         * modification end
         */
        if (!this.isItemsInitializing && item.isInnerItem()) {
            this.setActiveItem(item);
            this.getNavigationBar().onViewAdd(this, item, index);
        }

        if (this.initialized) {
            this.fireEvent('add', this, item, index);
        }
    },

//    /**
//     * Resets the view by removing all items between the first and last item.
//     * @return {Ext.Component} The view that is now active
//     */
//    reset: function() {
//        return this.pop(this.getInnerItems().length);
//    }
});
