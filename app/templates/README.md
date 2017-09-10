#__Base react project structure__

##Getting started

After downloading run in terminal

```js
npm install
```

To compile javascript and css

```js
//js
webpack --watch

//compass
compass watch
```


##Component Styling Guidelines
__For Sass with compass__
###Structure

All components should follow the structure below to implement the component styles

```scss
/*************************/
/////// GENERAL VARS //////
/*************************/

//TODO vars

/*************************/
/////// CUSTOM VARS /////// 
/*************************/

//TODO vars

/*************************/
///// TYPOGRAPHY VARS /////
/*************************/

//TODO vars

/*************************/
///// COMPONENT CODE //////
/*************************/

//TODO code

/*************************/
/////// CUSTOM CODE /////// 
/*************************/

//TODO code
```

####__GENERAL VARS__
These are the variables that should have minimal to none changes when reusing the component

####__CUSTOM VARS__
These are the variables that have to do with the theming of the component theoritacally these should be deleted every time you reuse the component

####__TYPOGRAPHY VARS__
These are the variables for typography attributes

####__COMPONENT CODE__
This is the component code usually has to do with the layout of the component, this should have minimal to none changes

####__CUSTOM CODE__
This is the component code usually have to do with the theming of the component theoritacally these should be deleted every time you reuse the component

###Variable Guidelines
* Variable names should be as descriptive as possible but not to big
* Variables should always be lowercase and have "-" between each word 
* When a css rule will have different values in different media then the variable should be a list of 3 items with the 1st item to be for the smallest screen and the last for the largests
```scss
$campaign-logo-widths:167px 167px 363px;

//Small Screens
.el{
     width:nth($campaign-logo-widths, 1); 
}

//Medium Screens
.el{
     width:nth($campaign-logo-widths, 2); 
}

//LargeScreens
.el{
     width:nth($campaign-logo-widths, 3); 
}
```

###Class & ID name conventions

* ID names should always be camel case with capital first letter
* Class names should always be lowercase and have "-" between each word 
* Parent elements of a component should always start with the component name (or a shortend version) followed by "-container" (unless there is a good reason)
```html
<div className="splash-container">
    {this.props.children}
</div>
```
* If a selector needed outside the component then it should be the name of the component followed by "-wrapper"

```html
<div className="app-container">
    <div className="splash-wrapper">
        <Splash />
    </div>
</div>
```


###Media queries
The default css styles apply to a width of up to 560px  
Use the mixins below to apply rules to other widths or devices

```scss
// css rules for width of 561px and above
@include SmallDevice{
    // TODO rules
}

// css rules for width of 961px and above
@include MediumDevice{
    // TODO rules
}

// css rules for width of 1201px and above
@include LargeDevice{
    // TODO rules
}

// css rules to apply only on embed
// body element should have a class of .embed
@include OnEmbedDevice{
    // TODO rules
}

// css rules to apply mobile specific
// body element should have a class of .mobile
@include OnMobileDevice{
    // TODO rules
}

// css rules to apply on mobile landscape devices
// body element should have a class of .mobile.landscape
@include OnMobileLandscape{
    // TODO rules
}

```

You can also hide specific elements just by adding the below classes or extensions to the elements you want to hide

* .hide-on-embed
* %hide-on-embed


* .hide-on-mobile 
* %hide-on-mobile

* .hide-on-mobile-landscape
* %hide-on-mobile-landscape


##Component Code Guidelines

###Creating new component
####__It is a seperate component if applies one or more of the below__
* Can clearly be used in another project
* Appears more than once in the same project
* Has multiple of the same element inside an outer element (card elements usually there are a few in inside one area)

###Do and don't