# The React component with vanilla HTML5 canvas (using hooks)

![screenshot](screenshot.gif)

The text falls in columns each of 20px wide.

In order to get the start position of every column we will create an array.

```javascript
const columns = Math.floor(w / 20) + 1;
const startPositions = Array.from({ length: columns }).map((_, i) => ({
  x: i * 20,
  y: 0,
}));
```

In each frame of the animation, a single random character will be put at the end of each column. Initially the end (y coordinate) of each column is at 0.

In each frame we render a semi transparent black rectangle on top of the previous frame, so that the characters rendered in previous frames can look progressively dimmed.

Also we randomly reset some columns to start from the top again.

For the rest of the columns the y coordinate will be moved 20px down, so that in next frame a new character appears below the current one.
