export const queries = {
  getUsers: "SELECT * FROM [User]",
  createUser: `INSERT INTO [User] (name, lastName, username, password, cellphone, mail, description, profilePicture,
                created_at, premium, occupation)
                VALUES (@name, @lastName, @username, @password, @cellphone, @mail, @description, @profilePicture,
                    @created_at, @premium, @occupation)`,
  getUserById: "SELECT * FROM [User] WHERE Id = @Id",
  getUserByUsername: "SELECT * FROM [User] WHERE username = @username",
  deleteUser: "DELETE FROM [User] WHERE Id = @Id",
  updateUser: `UPDATE [User] SET name = @name, lastName = @lastName, username = @username, password = @password, cellphone = @cellphone, mail = @mail,
                description = @description, profilepicture = @profilepicture, premium = @premium, occupation = @occupation
                  WHERE Id = @Id`,
  getPublications: `SELECT * FROM Publication`,
  getPublicationById: `SELECT * FROM Publication WHERE Id = @Id`,
  getPublicationsByUsername: `SELECT Publication.Id, 
	Publication.[name], 
	Publication.[image], 
	Publication.[created_at],
	Publication.[description],
	[User].username,
	[User].password,
	(select count(stateLike) from likeOrDislike where likeOrDislike.fkPublication = Publication.Id and stateLike = 1) as [likes]
	FROM Publication 
		INNER JOIN [User] ON Publication.fkUser = [User].Id 
		INNER JOIN [LikeOrDislike] ON Publication.fkUser = [LikeOrDislike].fkUser
		WHERE [User].username = @username`,
  getLikesFromPublication: `SELECT COUNT (*) as Likes FROM LikeOrDislike WHERE fkPublication = @fkPublication AND stateLike = 'True' AND stateDislike = 'False'`,
  getLikesFromUser: `SELECT Publication.Id, Publication.[name],Publication.[image],Publication.[created_at] ,Publication.[fkUser] ,Publication.[description]   
                        FROM LikeOrDislike
                        INNER JOIN Publication ON LikeOrDislike.fkPublication = Publication.Id
                        INNER JOIN [User] ON LikeOrDislike.fkUser = [User].Id
                        WHERE [User].username = @username AND [User].password = @password AND LikeOrDislike.stateLike = 1 AND LikeOrDislike.stateDislike = 0`,
  getDislikesFromUser: `SELECT Publication.Id, Publication.[name],Publication.[image],Publication.[created_at] ,Publication.[fkUser] ,Publication.[description]   
                        FROM LikeOrDislike
                        INNER JOIN Publication ON LikeOrDislike.fkPublication = Publication.Id
                        INNER JOIN [User] ON LikeOrDislike.fkUser = [User].Id
                        WHERE [User].username = @username AND [User].password = @password AND LikeOrDislike.stateLike = 0 AND LikeOrDislike.stateDislike = 1`,
  getDislikesFromPublication: `SELECT COUNT (*) as Dislikes FROM LikeOrDislike WHERE fkPublication = @fkPublication AND stateDislike = 'true' AND stateLike = 'False'`,
  getAllDataFromPublications: `SELECT Publication.Id,
    Publication.name,
    Publication.image,
    Publication.created_at,
    publication.description,
    [User].username as Username,
    [User].profilePicture as profilePicture,
    [User].occupation as occupation,
    [User].Id as UserId,
    (select count(stateLike) from likeOrDislike where likeOrDislike.fkPublication = Publication.Id and stateLike = 1) as [likes],
    (select count(stateDislike) from likeOrDislike where likeOrDislike.fkPublication = Publication.Id and stateDislike = 1) as [dislikes],
    (select count([text]) from Comment where Comment.fkPublication = Publication.Id) as comments
FROM Publication
LEFT JOIN [User] ON Publication.fkUser = [User].Id
LEFT JOIN LikeOrDislike ON Publication.Id = LikeOrDislike.fkPublication
LEFT JOIN Comment ON Publication.Id = Comment.fkPublication
GROUP BY 
	Publication.Id,
    Publication.name,
    Publication.image,
    Publication.created_at,
    publication.description,
    [User].username,
    LikeOrDislike.fkPublication,
    [User].profilePicture,
    [User].occupation,
    [User].Id
`,
  searchPublications: 
  `
  SELECT Publication.Id,Publication.name,Publication.image
FROM Publication
WHERE Publication.name LIKE '%' + @name + '%'
  `,
  createPublication: `INSERT INTO Publication (name, image, created_at, fkUser, description)
    VALUES (@name, @image, @created_at, @fkUser, @description)`,
  updatePublication: `UPDATE Publication SET image = @image, name = @name, fkUser = @fkUser, created_at = @created_at`,
  
  getComments: `SELECT * FROM Comment`,
  getCommentsByUserId: `SELECT * FROM Comment WHERE fkUser = @fkUser`,
  getCommentsByPublicationId: `
  SELECT	
  Comment.Id,
  Comment.text, 
  Comment.created_at, 
  Comment.fkUser, 
  Comment.fkPublication,
  [User].Id as UserId,
  [User].username as username,
  [User].profilePicture as profilePicture
  FROM Comment
  INNER JOIN [User] ON Comment.fkUser = [User].Id
  WHERE fkPublication=@fkPublication`,
  createComment: `INSERT INTO Comment (text, created_at, fkUser, fkPublication)
                    VALUES (@text, @created_at, @fkUser, @fkPublication)`,
  deleteComment: `DELETE FROM Comment WHERE Id = @Id`,
  deleteCommentsByUserId: `DELETE FROM Comment WHERE fkUser = @fkUser`,
  deleteCommentsByPublicationId: `DELETE FROM Comment WHERE fkPublication = @fkPublication`,
  getLikes: `SELECT * FROM LikeOrDislike WHERE stateLike = 'True' AND stateDislike = 'False'`,
  getDislikes: `SELECT * FROM LikeOrDislike WHERE stateLike = 'False' AND stateDislike = 'True'`,
  insertLikeOrDislike: `INSERT INTO LikeOrDislike (fkUser, fkPublication, stateLike, stateDislike)
                VALUES (@fkUser, @fkPublication, @stateLike, @stateDislike)`,
  updateLikeOrDislike: `UPDATE LikeOrDislike SET stateLike = @stateLike, stateDislike = @stateDislike
                WHERE fkUser = @fkUser AND fkPublication = @fkPublication`,
  deleteLikeOrDislike: `DELETE FROM LikeOrDislike WHERE fkUser = @fkUser AND fkPublication = @fkPublication`,
  login: `SELECT * FROM [User] WHERE username = @pUsername AND password = @pPassword`,
  prueba: `SELECT Publication.Id, Publication.[name], Publication.[image], Publication.created_at, Publication.fkUser, Publication.[description], [User].username as Username, LikeOrDislike.stateDislike as Disike, LikeOrDislike.stateLike as [Like], Comment.[text] as Comment
    from Publication
    INNER JOIN [User] 
    ON Publication.fkUser = [User].Id
    INNER JOIN LikeOrDislike 
    ON Publication.Id = LikeOrDislike.fkPublication
    INNER JOIN Comment
    ON Publication.Id = Comment.fkPublication
    WHERE Publication.Id = @publicationId`,
    deletePublication: `DELETE FROM Publication WHERE Id = @Id`,
    deletePublicationsFromUser: `DELETE FROM Publication WHERE fkUser = @fkUser`,

    getPublicationsByUserId: `SELECT * FROM Publication WHERE fkUser = @fkUser`
};
