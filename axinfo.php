<?php

class AxInfo {

	/**
	* To hide all mustache codes etc. for the visitor: use v-cloak combined with display: none in the CSS for [v-cloak]

	* transition and transition-group components: require CSS classes to effect a transition. You have to provide corresponding name-properties for the HTML elements. See for example <transition-group name="fade" tag="ul"> and .fade-enter-active and .fade-enter, .fade-leave-active

	In the case of a transition-group combined with v-for, the individual items must be recognizable by a unique key. For example  :key="item.id" in the HTML. The id here is unique.
	Furthermore: in this case all li elements are injected into a single span-element. To prevent this you can define the directive  tag="ul", to change this element to an ul.
	*/
	function AX_INTERESTING() {}

	/**
	* Start server from commandline with "npm run start"
	*/
	function AX_START_SERVER() {}
}
