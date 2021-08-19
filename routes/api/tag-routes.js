const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        as: "tagged_product",
      },
    ],
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ msg: "Invalid Request" });
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    include: [{ model: Product, as: "tagged_product" }],
    where: { id: req.body.id },
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ mgs: "No Tag found with that ID" });
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ msg: " Pleae Enter a Valild Tag Name" });
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {tag_name:req.body.tag_name},
    {
      where:{id:req.params.id}
    }
  )
  .then((dbTagData)=>{
    if(!dbTagData){
      res.status(404).json({msg: "No Tag found by that ID"})
    }
    res.json(dbTagData)
  }).catch((err)=>{
    console.log(err)
    res.status(500).json(err)
  })
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(
    {
      where: {id: req.body.id}
    }
  ).then((dbTagData)=>{
    if(!dbTagData){
      res.status(404).json({msg: "No Tag Found"})
      return
    }
    res.json(dbTagData)
  }).catch(err=>{
    console.log(err)
    res.status(500).json(err)
  })
});

module.exports = router;
