#pragma strict

var Speed : float;
protected var paused : boolean = false;
private var transformCache : Transform;

function OnPauseGame() {
	paused = true;
}

function OnResumeGame() {
	paused = false;
}

function Awake() {
  transformCache = transform;
}

function Update() {
  transformCache.position.x -= Speed * Time.deltaTime;
}