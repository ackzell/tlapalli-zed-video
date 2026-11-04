import { makeProject } from "@motion-canvas/core";

import "./styles/global.css";

import audio from "/audio.wav";

import scene01 from "./scenes/scene01-coldopen?scene";
import scene02 from "./scenes/scene02-comment?scene";
import scene03 from "./scenes/scene03-two-editors?scene";
import scene04 from "./scenes/scene04-formats?scene";
import scene05 from "./scenes/scene05-translation?scene";
import scene06 from "./scenes/scene06-pipeline?scene";
import scene07 from "./scenes/scene07-color-problem?scene";
import scene08 from "./scenes/scene08-uncertainty?scene";
import scene09 from "./scenes/scene09-pr?scene";
import scene10 from "./scenes/scene10-showcase?scene";
import scene11 from "./scenes/scene11-reflection?scene";
import scene12 from "./scenes/scene12-outro?scene";

export default makeProject({
  experimentalFeatures: true,
  audio,
  scenes: [
    scene01,
    scene02,
    scene03,
    scene04,
    scene05,
    scene06,
    // scene07,
    scene08,
    scene09,
    scene10,
    scene11,
    scene12,
  ],
});
