# Stroop Game

A Stroop test built with React, TypeScript, and Vite.

## Setup

```
npm install
```

## Run

```
npm run dev
```

## Build

```
npm run build
```

## Test

```
npm test
```
+```mermaid
+graph TD
+    App[App.tsx]
+ 
+    App --> StartScreen
+    App --> RoundIntro
+    App --> GamePlay
+    App --> Results
+ 
+    App --> useGameReducer
+ 
+    useGameReducer --> ROUND_CONFIGS
+    useGameReducer --> generateAllStimuli
+ 
+    generateAllStimuli --> COLORS
+    generateAllStimuli --> SHAPES
+ 
+    GamePlay --> useItemTimer
+    GamePlay --> usePlayerStopwatch
+    GamePlay --> getAllottedTimeMs
+    GamePlay --> TimerBar
+    GamePlay --> ClickButton
+    GamePlay --> ColorStimulus
+    GamePlay --> ShapeStimulus
+ 
+    ShapeStimulus --> ShapeSVG
+ 
+    ColorStimulus --> COLOR_HEX
+ 
+    Results --> calculateScore
+    Results --> storage
+ 
+    RoundIntro --> ROUND_CONFIGS
+ 
+    ROUND_CONFIGS --> types/game.ts
+    COLORS --> types/game.ts
+    COLOR_HEX --> types/game.ts
+    getAllottedTimeMs --> constants/game.ts
+ 
+    subgraph Components
+        StartScreen
+        RoundIntro
+        GamePlay
+        Results
+        TimerBar
+        ClickButton
+        ColorStimulus
+        ShapeStimulus
+        ShapeSVG
+    end
+ 
+    subgraph Hooks
+        useGameReducer
+        useItemTimer
+        usePlayerStopwatch
+    end
+ 
+    subgraph Utils
+        calculateScore[scoring.ts]
+        getAllottedTimeMs[timing.ts]
+        generateAllStimuli[stimulusGenerator.ts]
+        storage[storage.ts]
+    end
+ 
+    subgraph Data
+        types/game.ts
+        constants/game.ts
+        ROUND_CONFIGS
+        COLORS
+        SHAPES
+        COLOR_HEX
+    end
+```
