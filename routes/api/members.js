const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

// Gets All Members
router.get('/', (req, res) => {
    res.json(members); // don't need to do json stringify cause .json() will take care of it
});

// Get single member
router.get('/:id', (req, res) => {

    const found = members.some(member => member.id === parseInt(req.params.id)); // gives true or false based on condition - if exist or not
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No member with id of ${req.params.id}`});
    }
    
});

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({ msg: 'Please include a name and email'});
    }

    members.push(newMember);

    res.json(members);
    // when not writing apis and don't want json
    // res.redirect('/');
});

// update member
router.put('/:id', (req, res) => {

    const found = members.some(member => member.id === parseInt(req.params.id)); // gives true or false based on condition - if exist or not
    if(found){
        const upMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = upMember.name ? upMember.name : member.name;
                member.email = upMember.email ? upMember.email : member.email;
            }

            res.json({msg: 'Member updated ', member});
        });

        
    } else {
        res.status(400).json({msg: `No member with id of ${req.params.id}`});
    }
    
});

// Delete Meber
router.delete('/:id', (req, res) => {

    const found = members.some(member => member.id === parseInt(req.params.id)); // gives true or false based on condition - if exist or not
    if(found){
        res.json({
            msg: 'Member deleted', 
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({msg: `No member with id of ${req.params.id}`});
    }
    
});

module.exports = router;