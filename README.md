#wait

Javascript plugin to show an iOS style loading graphic.

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
wait.show();

//stuff happens

wait.hide();
```

###With Options (defaults shown)

```javascript
wait.show({
	title: 'Loading...',
	container: 'body', //centers wait inside this container
	preventClicks: true, //prevents users from clicking on anything inside the container,
	theme: 'dark' //'light' and 'none' also supported
});

//stuff happens

wait.hide();
```

###Other Methods

No Conflict

`var otherVar = wait.noConflict()`

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
