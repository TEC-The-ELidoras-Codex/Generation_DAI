# DAI_TEC Lotto Simulation

Educational Monte Carlo lottery simulation for teaching probability, expected value, and financial literacy to parents and teens.

## Purpose

This simulation is designed for **educational purposes only** to help parents teach their children about:
- Probability and statistics
- Expected value calculations
- Why lotteries are not investments
- The concept of house edge
- Financial decision making

## Quick Start

```bash
# Install dependencies
pip install numpy pyyaml

# Run simulation with default settings
python sim.py

# Run with custom parameters
python sim.py --budget 100 --seed 42 --output my_test
```

## Configuration

Edit `config.yaml` to customize the simulation:

```yaml
game_id: powerball
seed: 713
budget: 200
ticket_cost: 2
draws_to_play: 26
strategies:
  - quickpick
  - wheel_k
  - delta_system
output_format: html
evidence_level: full
parental_mode: true
```

## Educational Value

### Key Learning Points:
1. **Expected Value**: Each $2 ticket has a negative expected value (~-$1.25)
2. **House Edge**: The lottery keeps approximately 62.5% of all money wagered
3. **Probability**: The chance of winning the jackpot is about 1 in 292 million
4. **Variance**: Short-term results can vary wildly from expectations

### Parental Guidance:
- Use this to demonstrate mathematical concepts
- Discuss the difference between entertainment and investment
- Highlight how "lottery thinking" can lead to poor financial decisions
- Show that all strategies have the same expected value (negative)

## Data Model

The simulation generates three main datasets:

### draws.csv
- Historical lottery draw results
- Fields: `game_id`, `draw_date`, `numbers`, `bonus`, `jackpot_estimate_usd`, `sales_usd`, `source_hash`

### tickets.csv  
- Generated lottery tickets
- Fields: `ticket_id`, `strategy_id`, `numbers`, `bonus`, `cost`

### matches.csv
- Winning ticket matches
- Fields: `ticket_id`, `draw_date`, `match_main`, `match_bonus`, `payout`

## Strategies Implemented

1. **Quick Pick**: Random number selection (baseline)
2. **Wheel System**: Guarantees certain core numbers appear
3. **Delta System**: Uses mathematical patterns between numbers

**Important Note**: All strategies have the same expected value! This demonstrates that no system can overcome the mathematical house edge.

## Safety & Ethics

- Clearly labeled as educational simulation
- Emphasizes negative expected value
- Avoids "guaranteed win" language
- Includes parental guidance notes
- Maintains audit trail for all outputs

## File Structure

```
project_generation_dai_tec_lotto/
├── data_raw/          # Historical lottery data
├── data_clean/        # Processed datasets  
├── evidence/          # Supporting documentation
├── runs/              # Simulation output directories
├── notebooks/         # Jupyter analysis notebooks
├── reports/           # Generated HTML/PDF reports
├── src/               # Python source code
│   ├── __init__.py
│   ├── strategies.py  # Lottery number generation strategies
│   └── simulator.py   # Main simulation engine
├── config.yaml        # Configuration file
├── sim.py             # Command-line interface
└── README.md          # This file
```

## Example Output

```
🎰 Starting DAI_TEC Educational Lottery Simulation
📊 Game: powerball
💰 Budget: $200
🎟️  Ticket Cost: $2
🎲 Seed: 713
✅ Generated 100 tickets
✅ Simulated 26 draws
✅ Found 8 winning tickets

📈 EDUCATIONAL SUMMARY:
Total Spent: $200
Total Won: $28
Net Result: -$172
ROI: -86.0%
Expected Value per Ticket: -$1.25
House Edge: 62.5%

🎓 PARENTAL GUIDANCE:
This simulation demonstrates why lotteries are not investments. The house always has a mathematical advantage.
Understanding expected value and probability helps make informed financial decisions.
```

## Dependencies

- Python 3.7+
- NumPy (for random number generation)
- PyYAML (for configuration files)

## License

Educational use only. Part of the DAI_TEC parental empowerment framework.