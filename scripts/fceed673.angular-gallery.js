"use strict";angular.module("angular-gallery",[]).value("KEYCODES",{leftArrow:37,rightArrow:39}).directive("imageGallery",["KEYCODES",function(a){return{templateUrl:"views/_imageGallery.html",restrict:"EA",scope:{images:"=",selectedIndex:"=",useArrows:"@"},controller:["$scope","$attrs","$location",function(a){a.minIndex=0,a.maxIndex=a.images.length-1,a.suffix=+new Date,a.useArrows=a.useArrows?"false"===a.useArrows?!1:!0:!0,a.shouldRenderImage=function(b){return b==a.minIndex||b==a.maxIndex?!0:b>=+a.selectedIndex-1&&b<=+a.selectedIndex+1}}],link:function(b){var c=function(c){var d=c.keyCode||c.which,e=b.selectedIndex;switch(d){case a.leftArrow:e=b.selectedIndex==b.minIndex?b.maxIndex:b.selectedIndex-1;break;case a.rightArrow:e=b.selectedIndex==b.maxIndex?b.minIndex:b.selectedIndex+1}b.selectedIndex=e,b.$apply()},d=function(a){b.images=a,b.maxIndex=b.images.length-1};b.$watch("images",d),b.useArrows&&angular.element(window).on("keyup",c)}}}]);