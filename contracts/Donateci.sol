// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Donateci is ERC20{

  constructor() ERC20("Donateci Token", "DNC") {
    _mint(msg.sender, 100000000 * 10 ** 18);
  }
}
