<template>
  <div>
    <h1>How to Play Dice</h1>
    <h2>Rules</h2>
      <h3>Conditions</h3>
      <p>This game is played with six, six-sided dice and any group of two or more.</p>
      <p>Each player takes a turn rolling the dice, adding to their total score each round. The winner of the game is the first player to score 10,000 points.</p>

      <h3>Scoring</h3>
      <p>There are many ways to score points while rolling the dice. Certain dice and dice combinations will contribute to your total. Note that any combination requires each dice to be rolled on the same throw. Banked dice can't contribute to a combination on a later throw.</p>
      <p>Below is a breakdown of the scoring options</p>
      <ul>
        <li>Ones are worth 100</li>
        <li>Fives are worth 50</li>
        <li>Three of a kind is worth the face value times 100 (ex: three fours = 400)</li>
        <li>Three ones is 1000. This is an exception to the rule above</li>
        <li>Four of a kind is worth the corresponding three of a kind value times two. (ex: four fours = 400 * 2)</li>
        <li>Five of a kind is worth the corresponding four of a kind value times two. (ex: five fours = 400 * 2 * 2)</li>
        <li>Six of a kind is always worth an even 10,000 points regardless of the like number</li>
        <li>Three pairs (ex: Two, Two, Three, Three, Five, Five) is worth 1,000 points.</li>
        <li>A straight (rolling each number one through six) is worth 1,500 points.</li>
      </ul>

      <h3>Turns</h3>
      <p>Each turn starts by rolling all six dice. Calculate the total score of the dice, then decide between two options</p>
      <ul>
        <li>Finish your turn and add your score to your total.</li>
        <li>Bank at least one scoring dice, and reroll the rest</li>
      </ul>
      <p>When banking dice in order to reroll, you cannot break up combinations. If you roll three twos and would like to reroll, you must bank all three twos and reroll the remaining three dice.</p>
      <p>If at any point during your turn you roll a zero, your current turn score immediately drops to zero and your turn is over.</p>
      <p>If at any point all of the dice in your throw are counters (ex: you roll a straight with six dice), then you have the option to bank that score and reroll all six dice.</p>
      
      <h3>Zero Tracking</h3>
      <p>If a player rolls a zero in three consecutive turns, their total score for the game is reset to zero.</p>
      
      <h3>Rebuttles</h3>
      <p>Once a player gets to or past 10,000 points, every other player gets one turn to beat their score.</p>
      
      <h3>Sample Player Turn</h3>
      <p>Below is an example of a sample player's turn.</p>
      <ul>
        <li>Player enters their turn with 2,500 points</li>
        <li>Player rolls six dice: 1, 5, 4, 4, 3, 2</li>
        <li>They bank the one (100 points) and reroll the remaining five dice: 3, 3, 3, 1, 5</li>
        <li>All five dice are scoring (for a total of 300 + 100 + 50 = 450 points</li>
        <li>The player chooses to reroll all six dice and bank their total (100 + 450 = 550 points)</li>
        <li>Thier new roll with six dice returns: 2, 2, 3, 4, 6, 6</li>
        <li>There are no scoring dice. Their score for the turn goes to 0.</li>
        <li>Their turn is over and their total points remain at 2,500 points</li>
        <li>If this was their third zero in a row, their total score would fall to 0.</li>
      </ul>

    <h2>FAQs</h2>
      <h3>There's a real business teller in our group. Should I listen to their advice?</h3>
      <p>Absolutely not. If you want to roll that last dice with 2,000 points in the bank go right ahead. Or don't. What do I know?</p>
      
      <h3>I keep losing dice on my rolls. Is there an ideal surface on which to roll?</h3>
      <p>Nothing beats a solid ultimate frisbee. It will keep your dice nice and neat and makes passing to friends a breeze. Discouraged rolling surfaces: cast-iron pots/pans (heavy), towels (uneven), your boots (stinky), the dirt (dirty).</p>
      
      <h3>One of my dice missed the rolling surface. Do I count it on the ground</h3>
      <p>Nah, pick up all six dice and roll again.</p>
      
      <h3>Is our scorekeeper cheating?</h3>
      <p>Probably, but good luck finding someone else willing to keep score!</p>
      
      <h3>Is it dice or die? And when do I use one or the other?</h3>
      <p>Not important. What's important is to come up with your own opinion and confidently defend it against all logic and coherent arguments.</p>
  </div>
</template>

<script>

export default {
  name: 'Rules',
  components: {
    
  }
}
</script>

<style scoped>

</style>