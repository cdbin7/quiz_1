const faker = require("faker")
exports.seed = function(knex) {
  return knex("clucks").del()
    .then(function() {
      const clucks = [];
      for(let i = 0; i < 100; i++){
        clucks.push(
          {
            username: faker.name.firstName(),
            image_url: faker.image.imageUrl(),
            content: faker.company.catchPhrase(),
            created_at: faker.date.past(),
            updated_at: faker.date.past()
          }
        )
      }
      return knex("clucks").insert(clucks)
    });
}