#pragma strict

private var maxX : Vector3;
private var maxY : Vector3;
private var originalWidth;

function Start () {
	maxX = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, 0, 0));
	transform.position = new Vector3((-maxX.x - 5), 0, 0);
	
	originalWidth = Screen.width;
}

function Update () {
	if (originalWidth != Screen.width) {
		maxX = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, 0, 0));
		
		originalWidth = Screen.width;
		transform.position = new Vector3((-maxX.x - 5), 0, 0);
	}
}

function OnTriggerEnter2D(other : Collider2D) {
	Destroy(other.gameObject);
}