# week2

## REPO

1. Before starting the drawing, I compiled a list of commands I already knew, aiming to practice every newly‑learned command. To keep the exercises focused, I chose basic squares as my practice subject.
2. Prior to coding, I sketched my intended outcomes (including layout and animations) on paper. This allowed me to write code with clearer goals in mind.
3. Translating hand‑drawn sketches into code has been a fascinating process. I had to break down what needed to be done step‑by‑step. In particular, writing commit summaries in GitHub after each iteration helped organize my thinking. It was very rewarding to turn rough, random ideas into precise, logical web‑based code.

##  Question

I ran into an issue while trying to assign random colors to these shapes. I was unsure how to feed my random variable into the `color()` function. My initial thought was to add a `randomX` offset to the first HSB parameter. However, problems occur when `randomX` pushes this value beyond 360, the upper limit of the HSB hue wheel.

### Self‑solution: 
Two approaches can solve this problem:
1. Replace the hue value H directly with `randomX`, constraining the random range between 0‑360.
2. Add a random offset to the base hue value, and use modulo `% 360` to make `(H + randomX)` loop automatically within 0‑360.
