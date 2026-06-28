// Centralized master image registry.
// Newly uploaded high-resolution master imagery for Yog Jivan Sanctuary.
import outdoorBridgeLake from "@/assets/master/outdoor-bridge-lake.webp.asset.json";
import ploughPoseField from "@/assets/master/plough-pose-field.webp.asset.json";
import studioAdjustmentStudents from "@/assets/master/studio-adjustment-students.webp.asset.json";
import masterAnilMeditationPortrait from "@/assets/master/master-anil-meditation-portrait.webp.asset.json";
import kidsYogaHandstand from "@/assets/master/kids-yoga-handstand.webp.asset.json";
import advancedHeadstandOutdoor from "@/assets/master/advanced-headstand-outdoor.webp.asset.json";
import studioBackbendFlowers from "@/assets/master/studio-backbend-flowers.webp.asset.json";
import armBalanceOutdoor from "@/assets/master/arm-balance-outdoor.webp.asset.json";
import rabbitPoseStudio from "@/assets/master/rabbit-pose-studio.webp.asset.json";
import studioSplitPose from "@/assets/master/studio-split-pose.webp.asset.json";

export const masterImages = {
  founderPortrait: masterAnilMeditationPortrait.url,
  founderPortraitAlt: "Master Anil Choudhary in seated meditation — Founder of Yog Jivan Sanctuary",

  outdoorBridge: outdoorBridgeLake.url,
  ploughPose: ploughPoseField.url,
  studioAdjustment: studioAdjustmentStudents.url,
  kidsYoga: kidsYogaHandstand.url,
  advancedHeadstand: advancedHeadstandOutdoor.url,
  studioBackbend: studioBackbendFlowers.url,
  armBalance: armBalanceOutdoor.url,
  rabbitPose: rabbitPoseStudio.url,
  studioSplit: studioSplitPose.url,
} as const;

export const masterAlts = {
  founderPortrait: "Master Anil Choudhary in seated meditation — Founder of Yog Jivan Sanctuary",
  outdoorBridge: "Master Anil holding an advanced bridge variation by a lakeside",
  ploughPose: "Master Anil in plough pose (Halasana) on a sunlit field",
  studioAdjustment: "Master Anil giving a hands-on adjustment to a student in the studio",
  kidsYoga: "Master Anil guiding a young student through a supported handstand",
  advancedHeadstand: "Master Anil demonstrating an advanced inverted asana outdoors",
  studioBackbend: "Master Anil in a deep camel pose backbend inside the sanctuary studio",
  armBalance: "Master Anil holding an advanced arm balance with split legs",
  rabbitPose: "Master Anil in rabbit pose (Sasangasana) inside the sanctuary studio",
  studioSplit: "Master Anil in a deep seated forward fold split pose at the studio",
} as const;
