"""
Lotto Simulation Strategies Module
Educational Monte Carlo simulation for lottery games
"""

from numpy.random import Generator
import numpy as np
from typing import Tuple, List


def quickpick(rng: Generator, pool_main=range(1, 70), k=5) -> Tuple[Tuple[int, ...], int]:
    """
    Generate a quick pick lottery ticket.
    
    Args:
        rng: NumPy random generator (PCG64)
        pool_main: Range of main numbers
        k: Number of main numbers to pick
        
    Returns:
        Tuple of (main_numbers, bonus_number)
    """
    mains = tuple(sorted(rng.choice(list(pool_main), size=k, replace=False)))
    bonus = int(rng.choice(range(1, 27)))
    return mains, bonus


def wheel_k(rng: Generator, core_numbers: List[int], pool_main=range(1, 70), k=5) -> Tuple[Tuple[int, ...], int]:
    """
    Generate a wheeling system ticket with some core numbers.
    
    Args:
        rng: NumPy random generator
        core_numbers: Numbers to include in the wheel
        pool_main: Range of main numbers
        k: Total number of main numbers
        
    Returns:
        Tuple of (main_numbers, bonus_number)
    """
    remaining_pool = [n for n in pool_main if n not in core_numbers]
    needed = k - len(core_numbers)
    
    if needed > 0:
        additional = rng.choice(remaining_pool, size=needed, replace=False)
        mains = tuple(sorted(list(core_numbers) + list(additional)))
    else:
        mains = tuple(sorted(core_numbers[:k]))
    
    bonus = int(rng.choice(range(1, 27)))
    return mains, bonus


def delta_system(rng: Generator, base_number: int = 1, pool_main=range(1, 70), k=5) -> Tuple[Tuple[int, ...], int]:
    """
    Generate numbers using the delta system strategy.
    
    Args:
        rng: NumPy random generator
        base_number: Starting number
        pool_main: Range of main numbers
        k: Number of main numbers
        
    Returns:
        Tuple of (main_numbers, bonus_number)
    """
    deltas = rng.choice(range(1, 16), size=k-1, replace=True)
    numbers = [base_number]
    
    for delta in deltas:
        next_num = numbers[-1] + delta
        if next_num <= max(pool_main):
            numbers.append(next_num)
        else:
            # Wrap around or pick random
            numbers.append(rng.choice(list(pool_main)))
    
    # Ensure we have unique numbers within pool
    numbers = list(set(numbers))
    while len(numbers) < k:
        candidate = rng.choice(list(pool_main))
        if candidate not in numbers:
            numbers.append(candidate)
    
    mains = tuple(sorted(numbers[:k]))
    bonus = int(rng.choice(range(1, 27)))
    return mains, bonus


def calculate_expected_value(payout_table: dict, match_probabilities: dict, ticket_cost: float) -> float:
    """
    Calculate expected value for a lottery ticket.
    
    Args:
        payout_table: Dict mapping match types to payout amounts
        match_probabilities: Dict mapping match types to probabilities
        ticket_cost: Cost of one ticket
        
    Returns:
        Expected value in dollars
    """
    ev = 0.0
    for match_type, probability in match_probabilities.items():
        payout = payout_table.get(match_type, 0)
        ev += probability * payout
    
    return ev - ticket_cost


# Default payout table for Powerball-style game
DEFAULT_POWERBALL_PAYOUTS = {
    '5+1': 200_000_000,  # Jackpot
    '5+0': 1_000_000,
    '4+1': 50_000,
    '4+0': 100,
    '3+1': 100,
    '3+0': 7,
    '2+1': 7,
    '1+1': 4,
    '0+1': 4,
}

# Approximate probabilities for Powerball
DEFAULT_POWERBALL_PROBABILITIES = {
    '5+1': 1/292_201_338,
    '5+0': 1/11_688_053,
    '4+1': 1/913_129,
    '4+0': 1/36_525,
    '3+1': 1/14_494,
    '3+0': 1/579,
    '2+1': 1/701,
    '1+1': 1/92,
    '0+1': 1/38,
}