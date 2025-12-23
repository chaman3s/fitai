import { useState } from 'react';
import AudioPlayer from '@/components/audioPlayer';



const  WorkoutDay= [
{
  day: 1,
  title: 'Upper Body Strength',
  focus: 'Chest, Shoulders, Triceps',
  duration: '45 min',
  caloriesBurned: '320 kcal',
  exercises: [
  {
    id: 'ex1',
    name: 'Push-ups',
    sets: 3,
    reps: '12-15',
    restTime: '60',
    difficulty: 'Beginner',
    instructions: 'Start in a plank position with hands shoulder-width apart.\nLower your body until chest nearly touches the floor.\nPush back up to starting position.\nKeep your core engaged throughout the movement.\nMaintain a straight line from head to heels.',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1d9390292-1764649132607.png",
    imageAlt: 'Athletic man performing push-ups on yoga mat in bright gym with proper form',
    equipment: ['Yoga Mat'],
    targetMuscles: ['Chest', 'Triceps', 'Shoulders', 'Core']
  },
  {
    id: 'ex2',
    name: 'Dumbbell Shoulder Press',
    sets: 4,
    reps: '10-12',
    restTime: '90',
    difficulty: 'Intermediate',
    instructions: 'Sit on a bench with back support.\nHold dumbbells at shoulder height with palms facing forward.\nPress weights overhead until arms are fully extended.\nLower back to starting position with control.\nKeep core tight and avoid arching your back.',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1d9390292-1764649132607.png",
    imageAlt: 'Fit woman performing dumbbell shoulder press exercise on bench in modern gym',
    equipment: ['Dumbbells', 'Bench'],
    targetMuscles: ['Shoulders', 'Triceps', 'Upper Chest']
  },
  {
    id: 'ex3',
    name: 'Tricep Dips',
    sets: 3,
    reps: '10-15',
    restTime: '60',
    difficulty: 'Intermediate',
    instructions: 'Position hands shoulder-width apart on a stable bench or chair.\nExtend legs forward with heels on the ground.\nLower body by bending elbows to 90 degrees.\nPush back up to starting position.\nKeep elbows close to your body.',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_11596d5de-1764649130144.png",
    imageAlt: 'Athletic person doing tricep dips on parallel bars outdoors in park setting',
    equipment: ['Bench', 'Chair'],
    targetMuscles: ['Triceps', 'Shoulders', 'Chest']
  }]

},
{
  day: 2,
  title: 'Lower Body Power',
  focus: 'Legs, Glutes, Core',
  duration: '50 min',
  caloriesBurned: '380 kcal',
  exercises: [
  {
    id: 'ex4',
    name: 'Squats',
    sets: 4,
    reps: '12-15',
    restTime: '90',
    difficulty: 'Beginner',
    instructions: 'Stand with feet shoulder-width apart.\nLower your body by bending knees and hips.\nKeep chest up and weight on heels.\nGo down until thighs are parallel to ground.\nPush through heels to return to start.',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_155b601f9-1765763464893.png",
    imageAlt: 'Strong woman performing bodyweight squats with perfect form in fitness studio',
    equipment: ['None'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core']
  },
  {
    id: 'ex5',
    name: 'Lunges',
    sets: 3,
    reps: '10-12 each leg',
    restTime: '60',
    difficulty: 'Intermediate',
    instructions: 'Stand tall with feet hip-width apart.\nStep forward with one leg and lower hips.\nBoth knees should bend to 90 degrees.\nPush back to starting position.\nAlternate legs for each rep.',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_100d2d643-1765206617700.png",
    imageAlt: 'Fit man doing forward lunges with dumbbells in hands on outdoor track',
    equipment: ['Dumbbells (Optional)'],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves']
  },
  {
    id: 'ex6',
    name: 'Glute Bridges',
    sets: 3,
    reps: '15-20',
    restTime: '60',
    difficulty: 'Beginner',
    instructions: 'Lie on your back with knees bent and feet flat.\nPlace arms at your sides, palms down.\nLift hips off the ground until body forms a straight line.\nSqueeze glutes at the top.\nLower back down with control.',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1ec1a1f35-1764804435856.png",
    imageAlt: 'Woman performing glute bridge exercise on yoga mat with knees bent',
    equipment: ['Yoga Mat'],
    targetMuscles: ['Glutes', 'Hamstrings', 'Lower Back', 'Core']
  }]

},
{
  day: 3,
  title: 'Cardio & Core',
  focus: 'Endurance, Abs, Conditioning',
  duration: '40 min',
  caloriesBurned: '420 kcal',
  exercises: [
  {
    id: 'ex7',
    name: 'Burpees',
    sets: 3,
    reps: '10-15',
    restTime: '90',
    difficulty: 'Advanced',
    instructions: 'Start standing, then drop into a squat position.\nPlace hands on ground and jump feet back to plank.\nPerform a push-up.\nJump feet back to squat position.\nExplode up into a jump with arms overhead.',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_106eef151-1764676975895.png",
    imageAlt: 'Athletic person performing burpee exercise in modern gym with high energy',
    equipment: ['None'],
    targetMuscles: ['Full Body', 'Cardiovascular']
  },
  {
    id: 'ex8',
    name: 'Plank',
    sets: 3,
    reps: '45-60 seconds',
    restTime: '60',
    difficulty: 'Intermediate',
    instructions: 'Start in a forearm plank position.\nKeep body in a straight line from head to heels.\nEngage core and glutes.\nHold position without letting hips sag.\nBreathe steadily throughout.',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_192486f7b-1764711425278.png",
    imageAlt: 'Focused woman holding forearm plank position on exercise mat in gym',
    equipment: ['Yoga Mat'],
    targetMuscles: ['Core', 'Shoulders', 'Back']
  },
  {
    id: 'ex9',
    name: 'Mountain Climbers',
    sets: 3,
    reps: '20-30',
    restTime: '60',
    difficulty: 'Intermediate',
    instructions: 'Start in a high plank position.\nQuickly drive one knee toward chest.\nSwitch legs in a running motion.\nKeep core engaged and hips level.\nMaintain a steady, controlled pace.',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_176bbd617-1764666273779.png",
    imageAlt: 'Man performing mountain climbers exercise with dynamic movement on gym floor',
    equipment: ['Yoga Mat'],
    targetMuscles: ['Core', 'Shoulders', 'Hip Flexors', 'Cardiovascular']
  }]

}];
export default function WorkoutPlan(){
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    return (<>
          <AudioPlayer onPlayWorkout={() => setIsAudioPlaying(!isAudioPlaying)}
              isPlaying={isAudioPlaying} />

        </>);
}