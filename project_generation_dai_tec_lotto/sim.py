#!/usr/bin/env python3
"""
DAI_TEC Lotto Simulation CLI
Educational Monte Carlo simulation for teaching probability and expected value
"""

import argparse
import sys
from pathlib import Path
from datetime import datetime

# Add src to path
sys.path.insert(0, str(Path(__file__).parent / "src"))

from simulator import LottoSimulator


def main():
    parser = argparse.ArgumentParser(
        description="DAI_TEC Educational Lottery Simulation",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Run simulation with default config
  python sim.py
  
  # Run with custom config and output directory
  python sim.py --config custom_config.yaml --output runs/my_simulation
  
  # Run with specific seed for reproducibility
  python sim.py --seed 42 --output runs/seed_42_test
        """
    )
    
    parser.add_argument(
        "--config", "-c",
        default="config.yaml",
        help="Path to configuration YAML file (default: config.yaml)"
    )
    
    parser.add_argument(
        "--output", "-o",
        help="Output directory for results (default: runs/YYYYMMDD_HHMM)"
    )
    
    parser.add_argument(
        "--seed", "-s",
        type=int,
        help="Random seed for reproducibility (overrides config)"
    )
    
    parser.add_argument(
        "--budget", "-b",
        type=float,
        help="Budget for simulation (overrides config)"
    )
    
    parser.add_argument(
        "--quiet", "-q",
        action="store_true",
        help="Suppress output (only show final summary)"
    )
    
    args = parser.parse_args()
    
    # Validate config file exists
    if not Path(args.config).exists():
        print(f"❌ Error: Config file '{args.config}' not found")
        return 1
    
    # Set default output directory
    if not args.output:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M")
        args.output = f"runs/{timestamp}"
    
    try:
        # Initialize simulator
        simulator = LottoSimulator(args.config)
        
        # Override config with CLI arguments
        if args.seed is not None:
            simulator.config['seed'] = args.seed
            import numpy as np
            simulator.rng = np.random.default_rng(args.seed)
        
        if args.budget is not None:
            simulator.config['budget'] = args.budget
        
        # Run simulation
        if not args.quiet:
            print("🎰 DAI_TEC Educational Lottery Simulation")
            print("=" * 50)
        
        report = simulator.run_simulation(args.output)
        
        if not args.quiet:
            print("\n✅ Simulation completed successfully!")
            print(f"📁 Results saved to: {args.output}")
            print(f"🎓 Remember: This is for educational purposes only!")
        
        return 0
        
    except Exception as e:
        print(f"❌ Error running simulation: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())