// ==UserScript==
// @name                Tribal Wars Cavalry Recruiter Bot
// @description 	    Automatically recruits the desired cavalry as soon as possible.
// @author		        Igor Ruivo
// @include             http*://*.*game.php*screen=stable*
// @version     	    0.0.1
// @supportURL          https://github.com/igor-ruivo/tw-scripts
// @grant               GM_getResourceText
// @grant               GM_addStyle
// @grant               GM_getValue
// @grant               unsafeWindow
// @require             http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

//configs
const pairWithInfantry = false;
const maxLightCavalry = 5;
const averageMinutesReloadTime = 5;

(function () {
	'use strict';

	setTimeout(function () {
		nextIteration();
	}, Math.floor(Math.random() * 500));
})();

function getDate() {
	const date = new Date;
	const minutes = date.getMinutes();
	const hours = date.getHours();
	return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;
}

function nextIteration() {
	const availableUnits = document.getElementById("light_0_a")?.innerText.slice(1, -1);
	if(!availableUnits) {
		console.log("Cavalaria Leve ainda não foi pesquisada.");
		return;
	}
	const units = Math.min(maxLightCavalry, availableUnits);
	document.getElementById("light_0").value = units;
	const recruitButton = document.getElementsByClassName("btn btn-recruit")[0];
	recruitButton?.click();
	const delay = Math.floor(Math.random() * 1000 * 60 + averageMinutesReloadTime * 60 * 1000);
	if(units && recruitButton) {
		console.log(getDate() + " - A recrutar " + units + " Cavalaria Leve.");
	} else {
		console.log("Recursos insuficientes.");
	}
	if(pairWithInfantry) {
		console.log("A redirecionar para o quartel dentro de " + Math.round(delay / 1000 / 60) + " minutos...");
		setTimeout(function () {
			window.location.href = window.location.href.replace("screen=stable", "screen=barracks");
		}, delay);
	} else {
		console.log("Reload dentro de " + Math.round(delay / 1000 / 60) + " minutos...");
		setTimeout(function () {
			location.reload();
		}, delay);
	}
}