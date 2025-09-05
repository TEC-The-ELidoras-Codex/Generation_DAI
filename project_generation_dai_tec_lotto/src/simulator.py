"""
Monte Carlo Lottery Simulator
Educational tool for understanding probability and expected value
"""

import numpy as np
import yaml
from typing import Dict, List, Tuple, Any
from pathlib import Path
from datetime import datetime
import csv

from strategies import (
    quickpick, wheel_k, delta_system,
    calculate_expected_value,
    DEFAULT_POWERBALL_PAYOUTS,
    DEFAULT_POWERBALL_PROBABILITIES
)


class LottoSimulator:
    """Educational lottery simulator with parental safeguards"""
    
    def __init__(self, config_path: str = "config.yaml"):
        """Initialize simulator with configuration"""
        with open(config_path, 'r') as f:
            self.config = yaml.safe_load(f)
        
        self.rng = np.random.default_rng(self.config['seed'])
        self.tickets = []
        self.draws = []
        self.matches = []
        
    def generate_tickets(self) -> List[Dict[str, Any]]:
        """Generate lottery tickets using configured strategies"""
        tickets = []
        budget = self.config['budget']
        ticket_cost = self.config['ticket_cost']
        max_tickets = int(budget // ticket_cost)
        
        strategies = self.config['strategies']
        tickets_per_strategy = max_tickets // len(strategies)
        
        ticket_id = 1
        for strategy_name in strategies:
            for _ in range(tickets_per_strategy):
                if strategy_name == 'quickpick':
                    numbers, bonus = quickpick(self.rng)
                elif strategy_name == 'wheel_k':
                    # Use some common core numbers for wheeling
                    core = [7, 14, 21]
                    numbers, bonus = wheel_k(self.rng, core)
                elif strategy_name == 'delta_system':
                    numbers, bonus = delta_system(self.rng)
                else:
                    numbers, bonus = quickpick(self.rng)  # Default fallback
                
                ticket = {
                    'ticket_id': ticket_id,
                    'strategy_id': strategy_name,
                    'numbers': numbers,
                    'bonus': bonus,
                    'cost': ticket_cost
                }
                tickets.append(ticket)
                ticket_id += 1
        
        self.tickets = tickets
        return tickets
    
    def simulate_draws(self) -> List[Dict[str, Any]]:
        """Simulate lottery draws"""
        draws = []
        num_draws = self.config['draws_to_play']
        
        for draw_num in range(1, num_draws + 1):
            # Simulate a draw
            numbers, bonus = quickpick(self.rng)
            
            draw = {
                'draw_id': draw_num,
                'draw_date': datetime.now().strftime('%Y-%m-%d'),
                'numbers': numbers,
                'bonus': bonus,
                'jackpot_estimate_usd': 50_000_000 + draw_num * 1_000_000,  # Simulated growing jackpot
                'sales_usd': 10_000_000,  # Simulated ticket sales
                'source_hash': f"sim_{self.config['seed']}_{draw_num}"
            }
            draws.append(draw)
        
        self.draws = draws
        return draws
    
    def calculate_matches(self) -> List[Dict[str, Any]]:
        """Calculate winning matches between tickets and draws"""
        matches = []
        
        for ticket in self.tickets:
            for draw in self.draws:
                # Count matching numbers
                ticket_numbers = set(ticket['numbers'])
                draw_numbers = set(draw['numbers'])
                main_matches = len(ticket_numbers.intersection(draw_numbers))
                
                bonus_match = 1 if ticket['bonus'] == draw['bonus'] else 0
                
                # Determine match type
                match_type = f"{main_matches}+{bonus_match}"
                
                # Calculate payout
                payout = DEFAULT_POWERBALL_PAYOUTS.get(match_type, 0)
                
                if payout > 0:  # Only record winning matches
                    match = {
                        'ticket_id': ticket['ticket_id'],
                        'draw_id': draw['draw_id'],
                        'draw_date': draw['draw_date'],
                        'match_main': main_matches,
                        'match_bonus': bonus_match,
                        'match_type': match_type,
                        'payout': payout
                    }
                    matches.append(match)
        
        self.matches = matches
        return matches
    
    def generate_report(self) -> Dict[str, Any]:
        """Generate educational report with parental guidance"""
        total_spent = len(self.tickets) * self.config['ticket_cost']
        total_won = sum(match['payout'] for match in self.matches)
        net_result = total_won - total_spent
        
        # Calculate expected value
        ev = calculate_expected_value(
            DEFAULT_POWERBALL_PAYOUTS,
            DEFAULT_POWERBALL_PROBABILITIES,
            self.config['ticket_cost']
        )
        
        report = {
            'simulation_summary': {
                'game_id': self.config['game_id'],
                'seed': self.config['seed'],
                'total_tickets': len(self.tickets),
                'total_draws': len(self.draws),
                'total_spent': total_spent,
                'total_won': total_won,
                'net_result': net_result,
                'roi_percentage': (net_result / total_spent) * 100 if total_spent > 0 else 0,
                'expected_value_per_ticket': ev,
                'house_edge': -ev / self.config['ticket_cost'] * 100
            },
            'educational_notes': {
                'expected_value_explanation': f"Each ${self.config['ticket_cost']} ticket has an expected value of ${ev:.2f}, meaning you expect to lose ${-ev:.2f} per ticket on average.",
                'house_edge_explanation': f"The lottery has a house edge of {-ev/self.config['ticket_cost']*100:.1f}%, meaning the house keeps that percentage of all money wagered.",
                'parental_guidance': "This simulation demonstrates why lotteries are not investments. The house always has a mathematical advantage.",
                'learning_objective': "Understanding expected value and probability helps make informed financial decisions."
            },
            'strategy_performance': {},
            'winning_matches': len(self.matches),
            'timestamp': datetime.now().isoformat()
        }
        
        # Strategy breakdown
        for strategy in self.config['strategies']:
            strategy_tickets = [t for t in self.tickets if t['strategy_id'] == strategy]
            strategy_matches = [m for m in self.matches if any(t['ticket_id'] == m['ticket_id'] and t['strategy_id'] == strategy for t in strategy_tickets)]
            strategy_winnings = sum(m['payout'] for m in strategy_matches)
            strategy_cost = len(strategy_tickets) * self.config['ticket_cost']
            
            report['strategy_performance'][strategy] = {
                'tickets': len(strategy_tickets),
                'cost': strategy_cost,
                'winnings': strategy_winnings,
                'net': strategy_winnings - strategy_cost,
                'roi': (strategy_winnings - strategy_cost) / strategy_cost * 100 if strategy_cost > 0 else 0
            }
        
        return report
    
    def save_results(self, output_dir: str):
        """Save simulation results to CSV files"""
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        # Save tickets
        with open(output_path / 'tickets.csv', 'w', newline='') as f:
            if self.tickets:
                writer = csv.DictWriter(f, fieldnames=self.tickets[0].keys())
                writer.writeheader()
                writer.writerows(self.tickets)
        
        # Save draws
        with open(output_path / 'draws.csv', 'w', newline='') as f:
            if self.draws:
                writer = csv.DictWriter(f, fieldnames=self.draws[0].keys())
                writer.writeheader()
                writer.writerows(self.draws)
        
        # Save matches
        with open(output_path / 'matches.csv', 'w', newline='') as f:
            if self.matches:
                writer = csv.DictWriter(f, fieldnames=self.matches[0].keys())
                writer.writeheader()
                writer.writerows(self.matches)
    
    def run_simulation(self, output_dir: str = None) -> Dict[str, Any]:
        """Run complete simulation and return report"""
        print("🎰 Starting DAI_TEC Educational Lottery Simulation")
        print(f"📊 Game: {self.config['game_id']}")
        print(f"💰 Budget: ${self.config['budget']}")
        print(f"🎟️  Ticket Cost: ${self.config['ticket_cost']}")
        print(f"🎲 Seed: {self.config['seed']}")
        
        self.generate_tickets()
        print(f"✅ Generated {len(self.tickets)} tickets")
        
        self.simulate_draws()
        print(f"✅ Simulated {len(self.draws)} draws")
        
        self.calculate_matches()
        print(f"✅ Found {len(self.matches)} winning tickets")
        
        report = self.generate_report()
        
        if output_dir:
            self.save_results(output_dir)
            print(f"✅ Results saved to {output_dir}")
        
        print("\n📈 EDUCATIONAL SUMMARY:")
        print(f"Total Spent: ${report['simulation_summary']['total_spent']}")
        print(f"Total Won: ${report['simulation_summary']['total_won']}")
        print(f"Net Result: ${report['simulation_summary']['net_result']}")
        print(f"ROI: {report['simulation_summary']['roi_percentage']:.1f}%")
        print(f"Expected Value per Ticket: ${report['simulation_summary']['expected_value_per_ticket']:.2f}")
        print(f"House Edge: {report['simulation_summary']['house_edge']:.1f}%")
        
        print("\n🎓 PARENTAL GUIDANCE:")
        print(report['educational_notes']['parental_guidance'])
        print(report['educational_notes']['learning_objective'])
        
        return report


if __name__ == "__main__":
    # Quick test run
    sim = LottoSimulator()
    report = sim.run_simulation("runs/test_run")