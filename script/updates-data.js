firebase
  .firestore()
  .collection("database")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const date = (doc.id, "=>", doc.data());
      teste(date);
    });
  })
  .catch((error) => {
    console.log("Erro ao buscar documentos:", error);
  });

function teste(date) {
  console.log(date);
}
