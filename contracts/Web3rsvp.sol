//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Web3RSVP {
    struct CreateEvent {
        bytes32 eventId;
        string eventDataCID;
        address eventOwner;
        uint256 eventTimestamp;
        uint256 deposit;
        uint256 maxCapacity;
        address[] confirmedRSVPs;
        address[] claimedRSVPs;
        bool paidOut;
    }
    mapping(bytes32 => CreateEvent) public idToEvent;

    function CreateNewEvent(
        uint256 eventTimestamp,
        uint256 deposit,
        uint256 maxCapacity,
        string calldata eventDataCID
    ) external {
        bytes32 eventId = keccak256(
            abi.encodePacked(
                msg.sender,
                address(this),
                eventTimestamp,
                deposit,
                maxCapacity
            )
        );
            require(idToEvent[eventId].eventTimestamp==0,"Already Registred");


        address[] memory confirmedRSVPs;
        address [] memory claimedRSVPs;


        //this creates a new CreatEvent struct and adds it to idToEvent mapping

        idToEvent[eventId]=CreateEvent(
            eventId,
            eventDataCID,
            msg.sender,
            eventTimestamp,
            deposit,
            maxCapacity,
            confirmedRSVPs,
            claimedRSVPs,
            false
        );
      
            }

        
            function createNewRSVP(bytes32 eventId) external payable{
                //look up event from our mapping
                CreateEvent storage myEvent =idToEvent[eventId];

                //transfer deposit to our contract / require that they send enought ETH to cover the deposit
                require(msg.value== myEvent.deposit,"NOT ENOUGH");

                //require that the event hasn't already happened (<evenTimesyamp)
                require(block.timestamp<=myEvent.eventTimestamp,"ALREADY HAPPENED");

                //make sure event is under max capacity
                require(
                    myEvent.confirmedRSVPs.length < myEvent.maxCapacity,"This Event Has Reached Capacity"
                );

                //require that msg.sender isn't already in myEvent.confirmedRSVPs aka hasn't already RSVP'd
                for(uint8 i=0;i< myEvent.confirmedRSVPs.length;i++){
                    require(myEvent.confirmedRSVPs[i] != msg.sender,"ALREADY CONFIRMED");
                }
                myEvent.confirmedRSVPs.push(payable(msg.sender));
    }

}
