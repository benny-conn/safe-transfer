// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Pausable {
    event Pause();
    event Unpause();

    bool public paused = false;

    modifier onlyUnpaused() {
        require(!paused);
        _;
    }

    modifier onlyPaused() {
        require(paused);
        _;
    }

    function pause() public onlyUnpaused {
        paused = true;
        emit Pause();
    }

    function unpause() public onlyPaused {
        paused = false;
        emit Unpause();
    }
}
