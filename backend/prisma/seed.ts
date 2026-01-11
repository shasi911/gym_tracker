import { PrismaClient, Category, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

interface ExerciseSeed {
  name: string;
  description?: string;
  category: Category;
  muscleGroups: string[];
  equipment?: string;
  difficulty: Difficulty;
  instructions?: string;
}

const exercises: ExerciseSeed[] = [
  // ========== PUSH CATEGORY - CHEST ==========
  {
    name: 'Barbell Bench Press',
    description: 'Classic compound chest exercise',
    category: Category.PUSH,
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE,
    instructions: 'Lie on bench, lower bar to chest, press up explosively'
  },
  {
    name: 'Incline Barbell Bench Press',
    description: 'Targets upper chest',
    category: Category.PUSH,
    muscleGroups: ['upper chest', 'shoulders', 'triceps'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE,
    instructions: 'Set bench to 30-45 degrees, press barbell from upper chest'
  },
  {
    name: 'Decline Barbell Bench Press',
    description: 'Targets lower chest',
    category: Category.PUSH,
    muscleGroups: ['lower chest', 'triceps'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE,
    instructions: 'Set bench to decline angle, press barbell from lower chest'
  },
  {
    name: 'Dumbbell Bench Press',
    description: 'Greater range of motion than barbell',
    category: Category.CHEST,
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    equipment: 'dumbbell',
    difficulty: Difficulty.INTERMEDIATE,
    instructions: 'Press dumbbells from chest level, rotate slightly at top'
  },
  {
    name: 'Incline Dumbbell Bench Press',
    description: 'Upper chest focus with dumbbells',
    category: Category.CHEST,
    muscleGroups: ['upper chest', 'shoulders', 'triceps'],
    equipment: 'dumbbell',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Decline Dumbbell Bench Press',
    description: 'Lower chest emphasis',
    category: Category.CHEST,
    muscleGroups: ['lower chest', 'triceps'],
    equipment: 'dumbbell',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Dumbbell Flyes',
    description: 'Isolation exercise for chest stretch',
    category: Category.CHEST,
    muscleGroups: ['chest'],
    equipment: 'dumbbell',
    difficulty: Difficulty.INTERMEDIATE,
    instructions: 'Arc dumbbells down with slight bend in elbows, squeeze at top'
  },
  {
    name: 'Incline Dumbbell Flyes',
    description: 'Upper chest isolation',
    category: Category.CHEST,
    muscleGroups: ['upper chest'],
    equipment: 'dumbbell',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Cable Flyes',
    description: 'Constant tension chest isolation',
    category: Category.CHEST,
    muscleGroups: ['chest'],
    equipment: 'cable',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Chest Dips',
    description: 'Bodyweight chest builder',
    category: Category.PUSH,
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    equipment: 'bodyweight',
    difficulty: Difficulty.INTERMEDIATE,
    instructions: 'Lean forward, lower body, push back up'
  },
  {
    name: 'Machine Chest Press',
    description: 'Guided chest press movement',
    category: Category.CHEST,
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    equipment: 'machine',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Pec Deck Machine',
    description: 'Chest fly machine',
    category: Category.CHEST,
    muscleGroups: ['chest'],
    equipment: 'machine',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Push-ups',
    description: 'Classic bodyweight chest exercise',
    category: Category.PUSH,
    muscleGroups: ['chest', 'triceps', 'shoulders', 'core'],
    equipment: 'bodyweight',
    difficulty: Difficulty.BEGINNER,
    instructions: 'Lower body to ground, push back up, keep core tight'
  },
  {
    name: 'Decline Push-ups',
    description: 'Feet elevated push-up variation',
    category: Category.PUSH,
    muscleGroups: ['upper chest', 'shoulders', 'triceps'],
    equipment: 'bodyweight',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Incline Push-ups',
    description: 'Hands elevated, easier variation',
    category: Category.PUSH,
    muscleGroups: ['chest', 'triceps', 'shoulders'],
    equipment: 'bodyweight',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Landmine Press',
    description: 'Angular pressing movement',
    category: Category.PUSH,
    muscleGroups: ['chest', 'shoulders', 'core'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE
  },

  // ========== PUSH CATEGORY - SHOULDERS ==========
  {
    name: 'Overhead Press (Barbell)',
    description: 'Standing or seated shoulder press',
    category: Category.SHOULDERS,
    muscleGroups: ['shoulders', 'triceps', 'core'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE,
    instructions: 'Press barbell from shoulders to overhead, keep core tight'
  },
  {
    name: 'Seated Overhead Press (Dumbbell)',
    description: 'Dumbbell shoulder press seated',
    category: Category.SHOULDERS,
    muscleGroups: ['shoulders', 'triceps'],
    equipment: 'dumbbell',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Arnold Press',
    description: 'Rotating dumbbell press',
    category: Category.SHOULDERS,
    muscleGroups: ['shoulders', 'triceps'],
    equipment: 'dumbbell',
    difficulty: Difficulty.ADVANCED,
    instructions: 'Start palms facing you, rotate while pressing overhead'
  },
  {
    name: 'Lateral Raises',
    description: 'Side delt isolation',
    category: Category.SHOULDERS,
    muscleGroups: ['side delts'],
    equipment: 'dumbbell',
    difficulty: Difficulty.BEGINNER,
    instructions: 'Raise arms to sides until parallel to ground'
  },
  {
    name: 'Front Raises',
    description: 'Front delt isolation',
    category: Category.SHOULDERS,
    muscleGroups: ['front delts'],
    equipment: 'dumbbell',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Rear Delt Flyes',
    description: 'Rear deltoid isolation',
    category: Category.SHOULDERS,
    muscleGroups: ['rear delts'],
    equipment: 'dumbbell',
    difficulty: Difficulty.INTERMEDIATE,
    instructions: 'Bend forward, raise dumbbells to sides'
  },
  {
    name: 'Face Pulls',
    description: 'Rear delt and upper back',
    category: Category.SHOULDERS,
    muscleGroups: ['rear delts', 'upper back'],
    equipment: 'cable',
    difficulty: Difficulty.BEGINNER,
    instructions: 'Pull rope to face, separate ends, squeeze shoulder blades'
  },
  {
    name: 'Upright Rows',
    description: 'Shoulder and trap builder',
    category: Category.SHOULDERS,
    muscleGroups: ['shoulders', 'traps'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Shrugs (Barbell)',
    description: 'Trap isolation with barbell',
    category: Category.SHOULDERS,
    muscleGroups: ['traps'],
    equipment: 'barbell',
    difficulty: Difficulty.BEGINNER,
    instructions: 'Shrug shoulders up, hold, lower slowly'
  },
  {
    name: 'Shrugs (Dumbbell)',
    description: 'Trap isolation with dumbbells',
    category: Category.SHOULDERS,
    muscleGroups: ['traps'],
    equipment: 'dumbbell',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Machine Shoulder Press',
    description: 'Guided shoulder press',
    category: Category.SHOULDERS,
    muscleGroups: ['shoulders', 'triceps'],
    equipment: 'machine',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Cable Lateral Raises',
    description: 'Constant tension side delts',
    category: Category.SHOULDERS,
    muscleGroups: ['side delts'],
    equipment: 'cable',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Reverse Pec Deck',
    description: 'Machine rear delt isolation',
    category: Category.SHOULDERS,
    muscleGroups: ['rear delts'],
    equipment: 'machine',
    difficulty: Difficulty.BEGINNER
  },

  // ========== PUSH CATEGORY - TRICEPS ==========
  {
    name: 'Tricep Dips',
    description: 'Bodyweight tricep builder',
    category: Category.ARMS,
    muscleGroups: ['triceps', 'chest'],
    equipment: 'bodyweight',
    difficulty: Difficulty.INTERMEDIATE,
    instructions: 'Keep body upright, lower and press back up'
  },
  {
    name: 'Close-Grip Bench Press',
    description: 'Compound tricep exercise',
    category: Category.ARMS,
    muscleGroups: ['triceps', 'chest'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Skull Crushers (EZ Bar)',
    description: 'Lying tricep extension',
    category: Category.ARMS,
    muscleGroups: ['triceps'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE,
    instructions: 'Lower bar to forehead, extend arms back up'
  },
  {
    name: 'Overhead Tricep Extension (Dumbbell)',
    description: 'Overhead tricep stretch',
    category: Category.ARMS,
    muscleGroups: ['triceps'],
    equipment: 'dumbbell',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Tricep Pushdowns (Cable)',
    description: 'Cable tricep isolation',
    category: Category.ARMS,
    muscleGroups: ['triceps'],
    equipment: 'cable',
    difficulty: Difficulty.BEGINNER,
    instructions: 'Push bar down, squeeze triceps, return with control'
  },
  {
    name: 'Rope Pushdowns',
    description: 'Cable pushdowns with rope',
    category: Category.ARMS,
    muscleGroups: ['triceps'],
    equipment: 'cable',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Tricep Kickbacks',
    description: 'Dumbbell tricep isolation',
    category: Category.ARMS,
    muscleGroups: ['triceps'],
    equipment: 'dumbbell',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Diamond Push-ups',
    description: 'Close-grip push-up variation',
    category: Category.ARMS,
    muscleGroups: ['triceps', 'chest'],
    equipment: 'bodyweight',
    difficulty: Difficulty.INTERMEDIATE
  },

  // ========== PULL CATEGORY - BACK ==========
  {
    name: 'Deadlift',
    description: 'King of all exercises',
    category: Category.PULL,
    muscleGroups: ['back', 'hamstrings', 'glutes', 'core'],
    equipment: 'barbell',
    difficulty: Difficulty.ADVANCED,
    instructions: 'Hip hinge, grip bar, lift with legs and back, stand tall'
  },
  {
    name: 'Barbell Row',
    description: 'Bent-over row for back thickness',
    category: Category.BACK,
    muscleGroups: ['back', 'biceps'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE,
    instructions: 'Bend forward, pull bar to lower chest, squeeze back'
  },
  {
    name: 'T-Bar Row',
    description: 'Mid-back builder',
    category: Category.BACK,
    muscleGroups: ['back', 'biceps'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Dumbbell Row',
    description: 'Unilateral back exercise',
    category: Category.BACK,
    muscleGroups: ['back', 'biceps'],
    equipment: 'dumbbell',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Single-Arm Dumbbell Row',
    description: 'One arm at a time rowing',
    category: Category.BACK,
    muscleGroups: ['back', 'biceps'],
    equipment: 'dumbbell',
    difficulty: Difficulty.BEGINNER,
    instructions: 'Support on bench, pull dumbbell to hip, squeeze back'
  },
  {
    name: 'Pull-ups',
    description: 'Bodyweight back builder',
    category: Category.PULL,
    muscleGroups: ['back', 'biceps'],
    equipment: 'bodyweight',
    difficulty: Difficulty.ADVANCED,
    instructions: 'Pull body up until chin over bar, lower with control'
  },
  {
    name: 'Chin-ups',
    description: 'Underhand grip pull-ups',
    category: Category.PULL,
    muscleGroups: ['back', 'biceps'],
    equipment: 'bodyweight',
    difficulty: Difficulty.ADVANCED
  },
  {
    name: 'Lat Pulldown',
    description: 'Machine alternative to pull-ups',
    category: Category.BACK,
    muscleGroups: ['back', 'biceps'],
    equipment: 'cable',
    difficulty: Difficulty.BEGINNER,
    instructions: 'Pull bar to upper chest, lean back slightly'
  },
  {
    name: 'Seated Cable Row',
    description: 'Horizontal pulling movement',
    category: Category.BACK,
    muscleGroups: ['back', 'biceps'],
    equipment: 'cable',
    difficulty: Difficulty.BEGINNER,
    instructions: 'Pull handle to torso, keep back straight, squeeze shoulder blades'
  },
  {
    name: 'Chest-Supported Row',
    description: 'Row with chest support',
    category: Category.BACK,
    muscleGroups: ['back', 'biceps'],
    equipment: 'machine',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Pendlay Row',
    description: 'Explosive barbell row from floor',
    category: Category.BACK,
    muscleGroups: ['back', 'biceps'],
    equipment: 'barbell',
    difficulty: Difficulty.ADVANCED
  },
  {
    name: 'Yates Row',
    description: 'Underhand barbell row',
    category: Category.BACK,
    muscleGroups: ['back', 'biceps'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Inverted Rows',
    description: 'Bodyweight horizontal row',
    category: Category.BACK,
    muscleGroups: ['back', 'biceps'],
    equipment: 'bodyweight',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Straight-Arm Pulldown',
    description: 'Lat isolation movement',
    category: Category.BACK,
    muscleGroups: ['lats'],
    equipment: 'cable',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Hyperextensions',
    description: 'Lower back and glutes',
    category: Category.BACK,
    muscleGroups: ['lower back', 'glutes', 'hamstrings'],
    equipment: 'bodyweight',
    difficulty: Difficulty.BEGINNER
  },

  // ========== PULL CATEGORY - BICEPS ==========
  {
    name: 'Barbell Curl',
    description: 'Classic bicep builder',
    category: Category.ARMS,
    muscleGroups: ['biceps'],
    equipment: 'barbell',
    difficulty: Difficulty.BEGINNER,
    instructions: 'Curl bar to shoulders, squeeze biceps, lower with control'
  },
  {
    name: 'EZ Bar Curl',
    description: 'Angled bar for wrist comfort',
    category: Category.ARMS,
    muscleGroups: ['biceps'],
    equipment: 'barbell',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Dumbbell Curl',
    description: 'Alternating or simultaneous curls',
    category: Category.ARMS,
    muscleGroups: ['biceps'],
    equipment: 'dumbbell',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Hammer Curl',
    description: 'Neutral grip bicep curl',
    category: Category.ARMS,
    muscleGroups: ['biceps', 'forearms'],
    equipment: 'dumbbell',
    difficulty: Difficulty.BEGINNER,
    instructions: 'Keep palms facing each other throughout curl'
  },
  {
    name: 'Preacher Curl',
    description: 'Isolated bicep curl on bench',
    category: Category.ARMS,
    muscleGroups: ['biceps'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Concentration Curl',
    description: 'Single-arm focused curl',
    category: Category.ARMS,
    muscleGroups: ['biceps'],
    equipment: 'dumbbell',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Cable Curl',
    description: 'Constant tension bicep curl',
    category: Category.ARMS,
    muscleGroups: ['biceps'],
    equipment: 'cable',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Incline Dumbbell Curl',
    description: 'Bicep curl on incline bench',
    category: Category.ARMS,
    muscleGroups: ['biceps'],
    equipment: 'dumbbell',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: '21s',
    description: '7 bottom, 7 top, 7 full reps',
    category: Category.ARMS,
    muscleGroups: ['biceps'],
    equipment: 'barbell',
    difficulty: Difficulty.ADVANCED,
    instructions: '7 bottom half reps, 7 top half reps, 7 full reps'
  },
  {
    name: 'Reverse Curl',
    description: 'Overhand grip curl for forearms',
    category: Category.ARMS,
    muscleGroups: ['forearms', 'biceps'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE
  },

  // ========== LEGS CATEGORY - QUADS ==========
  {
    name: 'Barbell Back Squat',
    description: 'King of leg exercises',
    category: Category.LEGS,
    muscleGroups: ['quads', 'glutes', 'hamstrings', 'core'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE,
    instructions: 'Descend with control, drive through heels, stand up'
  },
  {
    name: 'Front Squat',
    description: 'Quad-focused squat variation',
    category: Category.LEGS,
    muscleGroups: ['quads', 'core'],
    equipment: 'barbell',
    difficulty: Difficulty.ADVANCED,
    instructions: 'Bar on front delts, keep torso upright, squat down'
  },
  {
    name: 'Leg Press',
    description: 'Machine quad builder',
    category: Category.LEGS,
    muscleGroups: ['quads', 'glutes', 'hamstrings'],
    equipment: 'machine',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Leg Extension',
    description: 'Quad isolation exercise',
    category: Category.LEGS,
    muscleGroups: ['quads'],
    equipment: 'machine',
    difficulty: Difficulty.BEGINNER,
    instructions: 'Extend legs, squeeze quads at top, lower with control'
  },
  {
    name: 'Bulgarian Split Squat',
    description: 'Single-leg squat variation',
    category: Category.LEGS,
    muscleGroups: ['quads', 'glutes'],
    equipment: 'dumbbell',
    difficulty: Difficulty.INTERMEDIATE,
    instructions: 'Rear foot elevated, descend on front leg, drive back up'
  },
  {
    name: 'Goblet Squat',
    description: 'Front-loaded squat with dumbbell',
    category: Category.LEGS,
    muscleGroups: ['quads', 'glutes'],
    equipment: 'dumbbell',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Hack Squat',
    description: 'Machine squat variation',
    category: Category.LEGS,
    muscleGroups: ['quads', 'glutes'],
    equipment: 'machine',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Sissy Squat',
    description: 'Advanced quad isolation',
    category: Category.LEGS,
    muscleGroups: ['quads'],
    equipment: 'bodyweight',
    difficulty: Difficulty.ADVANCED
  },
  {
    name: 'Walking Lunges',
    description: 'Dynamic lunge variation',
    category: Category.LEGS,
    muscleGroups: ['quads', 'glutes', 'hamstrings'],
    equipment: 'dumbbell',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Step-ups',
    description: 'Single-leg stepping movement',
    category: Category.LEGS,
    muscleGroups: ['quads', 'glutes'],
    equipment: 'dumbbell',
    difficulty: Difficulty.BEGINNER
  },

  // ========== LEGS CATEGORY - HAMSTRINGS ==========
  {
    name: 'Romanian Deadlift',
    description: 'Hip-hinge hamstring builder',
    category: Category.LEGS,
    muscleGroups: ['hamstrings', 'glutes', 'lower back'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE,
    instructions: 'Hip hinge, lower bar along legs, feel hamstring stretch'
  },
  {
    name: 'Stiff-Leg Deadlift',
    description: 'Straight-leg hamstring variation',
    category: Category.LEGS,
    muscleGroups: ['hamstrings', 'lower back'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Lying Leg Curl',
    description: 'Hamstring isolation lying down',
    category: Category.LEGS,
    muscleGroups: ['hamstrings'],
    equipment: 'machine',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Seated Leg Curl',
    description: 'Hamstring isolation seated',
    category: Category.LEGS,
    muscleGroups: ['hamstrings'],
    equipment: 'machine',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Nordic Curls',
    description: 'Bodyweight hamstring exercise',
    category: Category.LEGS,
    muscleGroups: ['hamstrings'],
    equipment: 'bodyweight',
    difficulty: Difficulty.ADVANCED,
    instructions: 'Knees anchored, lower body forward, use hamstrings to control'
  },
  {
    name: 'Good Mornings',
    description: 'Hip hinge with bar on back',
    category: Category.LEGS,
    muscleGroups: ['hamstrings', 'glutes', 'lower back'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Glute-Ham Raise',
    description: 'Advanced hamstring and glute exercise',
    category: Category.LEGS,
    muscleGroups: ['hamstrings', 'glutes'],
    equipment: 'machine',
    difficulty: Difficulty.ADVANCED
  },

  // ========== LEGS CATEGORY - GLUTES ==========
  {
    name: 'Hip Thrusts (Barbell)',
    description: 'Primary glute builder',
    category: Category.LEGS,
    muscleGroups: ['glutes', 'hamstrings'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE,
    instructions: 'Upper back on bench, drive hips up, squeeze glutes at top'
  },
  {
    name: 'Glute Bridge',
    description: 'Floor-based glute exercise',
    category: Category.LEGS,
    muscleGroups: ['glutes', 'hamstrings'],
    equipment: 'bodyweight',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Cable Pull-Through',
    description: 'Hip hinge with cable',
    category: Category.LEGS,
    muscleGroups: ['glutes', 'hamstrings'],
    equipment: 'cable',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Donkey Kicks',
    description: 'Glute isolation on all fours',
    category: Category.LEGS,
    muscleGroups: ['glutes'],
    equipment: 'bodyweight',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Fire Hydrants',
    description: 'Hip abduction exercise',
    category: Category.LEGS,
    muscleGroups: ['glutes', 'hip abductors'],
    equipment: 'bodyweight',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Sumo Deadlift',
    description: 'Wide-stance deadlift',
    category: Category.LEGS,
    muscleGroups: ['glutes', 'hamstrings', 'quads', 'back'],
    equipment: 'barbell',
    difficulty: Difficulty.INTERMEDIATE
  },

  // ========== LEGS CATEGORY - CALVES ==========
  {
    name: 'Standing Calf Raise',
    description: 'Standing calf isolation',
    category: Category.LEGS,
    muscleGroups: ['calves'],
    equipment: 'machine',
    difficulty: Difficulty.BEGINNER,
    instructions: 'Raise up on toes, hold at top, lower slowly'
  },
  {
    name: 'Seated Calf Raise',
    description: 'Seated calf isolation',
    category: Category.LEGS,
    muscleGroups: ['calves'],
    equipment: 'machine',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Donkey Calf Raise',
    description: 'Bent-over calf raise',
    category: Category.LEGS,
    muscleGroups: ['calves'],
    equipment: 'machine',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Calf Press on Leg Press',
    description: 'Calf raises on leg press machine',
    category: Category.LEGS,
    muscleGroups: ['calves'],
    equipment: 'machine',
    difficulty: Difficulty.BEGINNER
  },

  // ========== CORE CATEGORY ==========
  {
    name: 'Plank',
    description: 'Isometric core hold',
    category: Category.CORE,
    muscleGroups: ['abs', 'core'],
    equipment: 'bodyweight',
    difficulty: Difficulty.BEGINNER,
    instructions: 'Hold forearm position, keep body straight, engage core'
  },
  {
    name: 'Side Plank',
    description: 'Lateral core stability',
    category: Category.CORE,
    muscleGroups: ['obliques', 'core'],
    equipment: 'bodyweight',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Crunches',
    description: 'Basic ab exercise',
    category: Category.CORE,
    muscleGroups: ['abs'],
    equipment: 'bodyweight',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Bicycle Crunches',
    description: 'Dynamic ab and oblique exercise',
    category: Category.CORE,
    muscleGroups: ['abs', 'obliques'],
    equipment: 'bodyweight',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Russian Twists',
    description: 'Rotational core exercise',
    category: Category.CORE,
    muscleGroups: ['obliques', 'abs'],
    equipment: 'bodyweight',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Leg Raises',
    description: 'Lower ab exercise',
    category: Category.CORE,
    muscleGroups: ['lower abs'],
    equipment: 'bodyweight',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Hanging Leg Raises',
    description: 'Advanced lower ab exercise',
    category: Category.CORE,
    muscleGroups: ['lower abs', 'hip flexors'],
    equipment: 'bodyweight',
    difficulty: Difficulty.ADVANCED
  },
  {
    name: 'Ab Wheel Rollout',
    description: 'Advanced core stability',
    category: Category.CORE,
    muscleGroups: ['abs', 'core'],
    equipment: 'ab wheel',
    difficulty: Difficulty.ADVANCED
  },
  {
    name: 'Cable Crunches',
    description: 'Weighted ab crunch',
    category: Category.CORE,
    muscleGroups: ['abs'],
    equipment: 'cable',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Dead Bug',
    description: 'Core stability exercise',
    category: Category.CORE,
    muscleGroups: ['abs', 'core'],
    equipment: 'bodyweight',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Pallof Press',
    description: 'Anti-rotation core exercise',
    category: Category.CORE,
    muscleGroups: ['core', 'obliques'],
    equipment: 'cable',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Mountain Climbers',
    description: 'Dynamic core and cardio',
    category: Category.CORE,
    muscleGroups: ['abs', 'core'],
    equipment: 'bodyweight',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'V-ups',
    description: 'Advanced ab crunch variation',
    category: Category.CORE,
    muscleGroups: ['abs'],
    equipment: 'bodyweight',
    difficulty: Difficulty.ADVANCED
  },
  {
    name: 'Hollow Body Hold',
    description: 'Isometric core exercise',
    category: Category.CORE,
    muscleGroups: ['abs', 'core'],
    equipment: 'bodyweight',
    difficulty: Difficulty.ADVANCED
  },

  // ========== CARDIO CATEGORY ==========
  {
    name: 'Treadmill Running',
    description: 'Running on treadmill',
    category: Category.CARDIO,
    muscleGroups: ['legs', 'cardiovascular'],
    equipment: 'treadmill',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Stationary Bike',
    description: 'Cycling on stationary bike',
    category: Category.CARDIO,
    muscleGroups: ['legs', 'cardiovascular'],
    equipment: 'bike',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Rowing Machine',
    description: 'Full-body cardio',
    category: Category.CARDIO,
    muscleGroups: ['back', 'legs', 'arms', 'cardiovascular'],
    equipment: 'rowing machine',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Stair Climber',
    description: 'Climbing stairs machine',
    category: Category.CARDIO,
    muscleGroups: ['legs', 'glutes', 'cardiovascular'],
    equipment: 'stair climber',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Elliptical',
    description: 'Low-impact cardio machine',
    category: Category.CARDIO,
    muscleGroups: ['legs', 'cardiovascular'],
    equipment: 'elliptical',
    difficulty: Difficulty.BEGINNER
  },
  {
    name: 'Jump Rope',
    description: 'Skipping rope cardio',
    category: Category.CARDIO,
    muscleGroups: ['legs', 'cardiovascular'],
    equipment: 'jump rope',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Battle Ropes',
    description: 'Upper body and cardio',
    category: Category.CARDIO,
    muscleGroups: ['arms', 'shoulders', 'core', 'cardiovascular'],
    equipment: 'battle ropes',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'Box Jumps',
    description: 'Plyometric leg exercise',
    category: Category.CARDIO,
    muscleGroups: ['legs', 'glutes', 'cardiovascular'],
    equipment: 'box',
    difficulty: Difficulty.ADVANCED
  },
  {
    name: 'Burpees',
    description: 'Full-body explosive movement',
    category: Category.CARDIO,
    muscleGroups: ['full body', 'cardiovascular'],
    equipment: 'bodyweight',
    difficulty: Difficulty.INTERMEDIATE
  },
  {
    name: 'High Knees',
    description: 'Running in place with high knees',
    category: Category.CARDIO,
    muscleGroups: ['legs', 'cardiovascular'],
    equipment: 'bodyweight',
    difficulty: Difficulty.BEGINNER
  },

  // ========== OLYMPIC / FULL BODY CATEGORY ==========
  {
    name: 'Clean and Jerk',
    description: 'Olympic lift: clean to shoulders, jerk overhead',
    category: Category.OLYMPIC,
    muscleGroups: ['full body'],
    equipment: 'barbell',
    difficulty: Difficulty.ADVANCED,
    instructions: 'Pull bar to shoulders, dip and drive overhead'
  },
  {
    name: 'Snatch',
    description: 'Olympic lift: ground to overhead in one motion',
    category: Category.OLYMPIC,
    muscleGroups: ['full body'],
    equipment: 'barbell',
    difficulty: Difficulty.ADVANCED
  },
  {
    name: 'Power Clean',
    description: 'Explosive pull to shoulders',
    category: Category.OLYMPIC,
    muscleGroups: ['back', 'legs', 'shoulders'],
    equipment: 'barbell',
    difficulty: Difficulty.ADVANCED
  },
  {
    name: 'Hang Clean',
    description: 'Clean from hanging position',
    category: Category.OLYMPIC,
    muscleGroups: ['back', 'legs', 'shoulders'],
    equipment: 'barbell',
    difficulty: Difficulty.ADVANCED
  },
  {
    name: 'Thruster',
    description: 'Front squat to overhead press',
    category: Category.FULL_BODY,
    muscleGroups: ['legs', 'shoulders', 'core'],
    equipment: 'barbell',
    difficulty: Difficulty.ADVANCED,
    instructions: 'Squat down, drive up and press overhead in one motion'
  },
  {
    name: 'Kettlebell Swing',
    description: 'Hip-hinge explosive movement',
    category: Category.FULL_BODY,
    muscleGroups: ['glutes', 'hamstrings', 'back', 'shoulders'],
    equipment: 'kettlebell',
    difficulty: Difficulty.INTERMEDIATE,
    instructions: 'Hip hinge, swing kettlebell up with hip drive'
  },
  {
    name: 'Turkish Get-Up',
    description: 'Complex full-body movement',
    category: Category.FULL_BODY,
    muscleGroups: ['full body', 'core', 'shoulders'],
    equipment: 'kettlebell',
    difficulty: Difficulty.ADVANCED,
    instructions: 'Move from lying to standing while holding weight overhead'
  }
];

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.workoutLog.deleteMany();
  await prisma.workoutSession.deleteMany();
  await prisma.workoutExercise.deleteMany();
  await prisma.workoutPlan.deleteMany();
  await prisma.exercise.deleteMany();

  console.log('Deleted existing data');

  // Seed exercises
  for (const exercise of exercises) {
    await prisma.exercise.create({
      data: exercise
    });
  }

  console.log(`Seeded ${exercises.length} exercises`);
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
