const Member = require('../models/member');
const statuscode = require('../statuscode')

const member_index = (req, res) => {
    Member.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.render('memindex', { title: 'Members', members: result });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const member_details = (req, res) => {
    const id = req.params.id;
    Member.findById(id)
      .then((result) => {
        res.render('memdetails', { member: result, title: 'These are the details' });
      })
      .catch((err) => {
        res.status(pageNotFound).render('404', { title: 'Member not found.' });
      });
  };
  
  const member_create_get = (req, res) => {
    res.render('memcreate', { title: 'Create Member' });
  };
  
  const member_create_post = (req, res) => {
    const member = new Member(req.body);
    member
      .save()
      .then((result) => {
        console.log(res.statusCode);
        res.redirect('/members');
      })
      .catch((err) => {
        console.log(res.statusCode);
        console.log(err);
      });
  };

  const member_update_get = async (req,res)=>{
    const member = await Member.findById(req.params.id);
    try{
      if(!member){
        res.status(pageNotFound).send('member not found')
      }
      else{
        res.status(success).render('memupdate', {title:'update', member})
      }
    }
    catch{(err)=>{
      console.log(err);
    }}

  }

  const member_update_patch = (req,res)=>{
    const member = Member.findByIdAndUpdate(req.params.id, req.body, {new:true}).then((result)=>{
      res.redirect(`/members/${req.params.id}`)
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  
  const member_delete = (req, res) => {
    const id = req.params.id;
    Member.findByIdAndDelete(id)
      .then((result) => {
        res.json({ redirect: '/members' });
      })
      .catch((err) => console.log(err));
  };

module.exports = {
    member_index,
    member_create_post,
    member_create_get,
    member_details,
    member_delete,
    member_update_get,
    member_update_patch
}