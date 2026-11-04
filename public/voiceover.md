# Tlapalli for Zed — English Voiceover Script

## Synced to scene breakdown / YouTube / Sequel

---

## SCENE 01 — Cold open

_No voiceover. Logo assembles, Zed mark appears beside it. ~3 seconds._

---

## SCENE 02 — The comment

Someone left a comment.

[PAUSE]

They were waiting for Tlapalli to come to Zed.

[PAUSE]

That was enough of a spark for this new project.

---

## SCENE 03 — Situation

Zed is a different editor.

[PAUSE]

Fast, focused, written in Rust.
It has a very clear point of view about what an editor should be.

[PAUSE]

And it also has its own way of doing themes.
Its own format. Its own conventions.

[PAUSE]

I wasn't a Zed user.

[RITMO ↓]

But someone who was — wanted Tlapalli there.

---

## SCENE 04 — Different formats

The first thing I ran into was structural.

[PAUSE]

In VSCode, every theme variant is its own file.
Tlapalli has 16 variants — so that's 16 files.

[PAUSE]

In Zed, the whole family lives in one.
One JSON file. One `themes` array. Everything inside.

[PAUSE]

That's not a problem — it's just a different philosophy.

---

## SCENE 05 — The translation

The harder part was the keys.

[PAUSE]

VSCode names things by component.
`sideBar.background`. `editorWidget.background`. `tab.activeBackground`.

[PAUSE]

Zed names things by meaning.
`panel.background`. `elevated_surface.background`. `tab.active_background`.

[PAUSE]

You can't just rename them.
You have to understand what each one is trying to say —
and find its equivalent in the other language.

[RITMO ↓]

So the AI and I built a translation layer.
A map from every VSCode key to its nearest Zed equivalent.
And fallback logic for the ~70 Zed keys that VSCode simply doesn't define.

---

## SCENE 06 — The pipeline

The pipeline ended up being three commands.

[PAUSE]

Generate the themes from the VSCode originals.
Install them locally to test.
Copy them to the Zed extension repo when ready.

[PAUSE]

The local install was my favorite part.

You drop a file into a folder —
and Zed picks it up automatically.

[RITMO ↓]

No restart.
No reload.

Just — there.

---

## SCENE 07 — The color problem

Then came the part I was overcomplicating.

[PAUSE]

Colors.

[PAUSE]

Specifically — git indicators. Errors. Warnings.

[PAUSE]

My first idea was to derive them automatically from each theme's base color.
Green for added files. Yellow for modified. Red for deleted.
Calculated to harmonize with each of the 16 variants.

[PAUSE]

It worked.

[RITMO ↓]

Mostly.

[PAUSE]

But keeping it consistent across 16 themes —
with manual tweaks for the edge cases —
became exactly the kind of complexity that took the fun out of it.

[PAUSE]

So I simplified.

[PAUSE]

One fixed color for errors.
One for warnings.
One for git status.

The same across all 16 themes.
Chosen to look good everywhere.
Just like VSCode does.

[RITMO ↓]

That was enough.

---

## SCENE 08 — Uncertainty

But there was something else bothering me.

[PAUSE]

I'm not a Zed user.

[PAUSE]

I don't have the eye for it.
I don't know what their community expects from a theme.
I didn't know if my color decisions would feel right to someone
who actually uses this editor every day.

[PAUSE]

So I iterated.

Back and forth with my trusty clanker.
Using Zed's official theme builder to preview changes.
Tweaking until I felt —

[RITMO ↓]

ready enough.

---

## SCENE 09 — The PR

Zed requires extensions to live in a separate repository.

[PAUSE]

So I created one.
Set up the same release automation I already had for VSCode.
Opened the PR.

[PAUSE]

I'd seen other extensions wait weeks to get merged.

[PAUSE]

Mine merged fast.

[PAUSE]

No comments from the maintainers.

[PAUSE]

[RITMO ↓]

That silence was sort of relieving in a way.

---

## SCENE 10 — The showcase

Tlapalli is now available for Zed.

[PAUSE]

All 16 themes. Dark and light.

[PAUSE]

Same gems. Same names. Same idea.

[RITMO ↓]

Different home.

---

## SCENE 11 — Closing reflection

One comment started all of this.

[PAUSE]

I didn't want to say no.

[PAUSE]

And somewhere in the process of building something
for a community that isn't mine —

[PAUSE]

I got a little bit won over.

[RITMO ↓]

Zed is fast in a way that stays with you.

Not just at startup.
Every interaction.
Every keystroke.

[PAUSE]

I'm still a VSCode user.

[PAUSE]

But I understand now why someone would wait for their theme to arrive there.

---

## SCENE 12 — Outro

You can find Tlapalli for Zed in the Zed extension store.

[PAUSE]

If you're on VSCode, it's still on the Marketplace and Open VSX.

[PAUSE]

And you can see all the themes at tlapalli.ackzell.dev.

[PAUSE]

Thanks for watching.

---

## Pacing reference

| Scene                  | Est. duration |
| ---------------------- | ------------- |
| 01 Cold open (silence) | 4s            |
| 02 The comment         | ~20s          |
| 03 Situation           | ~30s          |
| 04 Different formats   | ~25s          |
| 05 The translation     | ~35s          |
| 06 The pipeline        | ~25s          |
| 07 Color problem       | ~40s          |
| 08 Uncertainty         | ~25s          |
| 09 The PR              | ~25s          |
| 10 Showcase            | ~15s          |
| 11 Reflection          | ~35s          |
| 12 Outro               | ~20s          |
| **Total**              | **~4:40 min** |
