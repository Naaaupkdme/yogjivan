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

// Newly uploaded community / hero / student imagery (WebP only).
import uploadAcroHero from "@/assets/uploads/img_20260618_065832.webp.asset.json";
import uploadAcroHero2 from "@/assets/uploads/img_3777.webp.asset.json";
import uploadWarriorClass from "@/assets/uploads/4190.webp.asset.json";
import uploadSavasana from "@/assets/uploads/fb_img_1685724620946.webp.asset.json";
import uploadCamelPose from "@/assets/uploads/img_5569.webp.asset.json";
import uploadAdjustmentRed from "@/assets/uploads/img_5568.webp.asset.json";
import uploadWallSeated from "@/assets/uploads/img_5570.webp.asset.json";
import uploadGroupNamaste from "@/assets/uploads/img_20260621_105308.webp.asset.json";
import uploadGroupCelebration from "@/assets/uploads/img_20260622_114016.webp.asset.json";

export const masterImages = {
  founderPortrait: armBalanceOutdoor.url,
  founderPortraitAlt: "Master Anil Choudhary — Founder of Yog Jivan Sanctuary — holding an advanced arm balance outdoors",
  meditationPortrait: masterAnilMeditationPortrait.url,

  outdoorBridge: outdoorBridgeLake.url,
  ploughPose: ploughPoseField.url,
  studioAdjustment: studioAdjustmentStudents.url,
  kidsYoga: kidsYogaHandstand.url,
  advancedHeadstand: advancedHeadstandOutdoor.url,
  studioBackbend: studioBackbendFlowers.url,
  armBalance: armBalanceOutdoor.url,
  rabbitPose: rabbitPoseStudio.url,
  studioSplit: studioSplitPose.url,

  // Heroes / brand wall
  acroHero: uploadAcroHero.url,
  acroHero2: uploadAcroHero2.url,

  // Community & teaching
  warriorClass: uploadWarriorClass.url,
  savasanaClass: uploadSavasana.url,
  camelPose: uploadCamelPose.url,
  adjustmentRed: uploadAdjustmentRed.url,
  wallSeated: uploadWallSeated.url,
  groupNamaste: uploadGroupNamaste.url,
  groupCelebration: uploadGroupCelebration.url,
} as const;

export const masterAlts = {
  founderPortrait: "Master Anil Choudhary, Founder of Yog Jivan Sanctuary, holding an advanced arm balance on a sunlit field",
  outdoorBridge: "Master Anil holding an advanced bridge variation by a lakeside",
  ploughPose: "Master Anil in plough pose (Halasana) on a sunlit field",
  studioAdjustment: "Master Anil giving a hands-on adjustment to a student in the studio",
  kidsYoga: "Master Anil guiding a young student through a supported handstand",
  advancedHeadstand: "Master Anil demonstrating an advanced inverted asana outdoors",
  studioBackbend: "Master Anil in a deep camel pose backbend inside the sanctuary studio",
  armBalance: "Master Anil holding an advanced arm balance with split legs",
  rabbitPose: "Master Anil in rabbit pose (Sasangasana) inside the sanctuary studio",
  studioSplit: "Master Anil in a deep seated forward fold split pose at the studio",
  acroHero: "Yog Jivan acro yoga trio in front of the sanctuary brand wall",
  acroHero2: "Two students balanced in flying acro yoga supported by Master Anil",
  warriorClass: "Master Anil leading a Warrior II class for Vietnamese students",
  savasanaClass: "Students resting in Savasana inside the Yog Jivan studio",
  camelPose: "Student in supported camel pose by the studio window",
  adjustmentRed: "Master Anil adjusting a student in a deep mermaid backbend",
  wallSeated: "Student in seated wall stretch bathed in soft window light",
  groupNamaste: "Large Yog Jivan community group in seated namaste outdoors",
  groupCelebration: "Yog Jivan community celebrating International Yoga Day with raised hands",
} as const;
