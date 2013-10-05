#wait

Fidel plugin to show an iOS style loading graphic.

![](https://raw.github.com/firstandthird/wait/master/design/dark.png)

##Features

- Doesn't allow user to click anything else while visible (configurable).
- Theme support.

##Installation

###Bower

`bower install wait`

###Manual Download

- [Development]()
- [Production]()

##Usage

###Basic

```javascript
$('#element').wait('show');

//stuff happens

$('#element').wait('hide');
```

###With Options (defaults shown)

```javascript
$('#element').wait('show',{
	title: 'Loading...',
	container: 'body', //centers wait inside this container
	preventClicks: true, //prevents users from clicking on anything inside the container,
	theme: 'dark' //'light' and 'none' also supported
	onShow : function() { ... } // Function fired upon shown
	onHide : function() { ... } // Function fired upon hide
	pprogressSupport : false // Gives support for pprogress
});

//stuff happens

$('#element').wait('hide');
```

###Other Methods

#### Set Text

Will change the text while is being shown.

`$('#element').wait('setText', 'Disappearing on 5 seconds...')`

### Pprogress support

If the [pprogress](https://github.com/firstandthird/pprogress) plugin is in the page and you pass the option `pprogressSupport` as `true`, wait will take the plugin and create a basic template inside of the modal so you can do fancy timers for wait.

The wait plugin offers a wrapper around pprogress so if you call

```javascript
$('#element').wait('pprogress','tick', 0.20);
```

Will call the method thick on the inner pprogress instance passing the value `0.20`. Please, see [pprogress](https://github.com/firstandthird/pprogress) docs in order to learn more about this plugin.

While using pprogress, wait will show pprogress on modal show, and it will hide itself when pprogress completes.

##Development

###Requirements

- node and npm
- bower `npm install -g bower`
- grunt `npm install -g grunt-cli`

###Setup

- `npm install`
- `bower install`

###Run

`grunt dev`

###Tests

`grunt mocha`
