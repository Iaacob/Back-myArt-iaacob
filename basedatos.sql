USE [MyArtBD]
GO
/****** Object:  User [alumno]    Script Date: 18/11/2022 10:56:26 ******/
CREATE USER [alumno] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [Valen]    Script Date: 18/11/2022 10:56:26 ******/
CREATE USER [Valen] FOR LOGIN [Valen] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Valen]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 18/11/2022 10:56:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[text] [varchar](max) NOT NULL,
	[created_at] [datetime] NOT NULL,
	[fkUser] [int] NOT NULL,
	[fkPublication] [int] NOT NULL,
 CONSTRAINT [PK_Comment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Follows]    Script Date: 18/11/2022 10:56:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Follows](
	[fkUser] [int] NOT NULL,
	[followed] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LikeOrDislike]    Script Date: 18/11/2022 10:56:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LikeOrDislike](
	[fkUser] [int] NOT NULL,
	[fkPublication] [int] NOT NULL,
	[stateLike] [bit] NOT NULL,
	[stateDislike] [bit] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Publication]    Script Date: 18/11/2022 10:56:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Publication](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[image] [varchar](255) NOT NULL,
	[created_at] [datetime] NOT NULL,
	[fkUser] [int] NOT NULL,
	[description] [varchar](max) NULL,
	[precio] [varchar](max) NULL,
 CONSTRAINT [PK_Publication] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 18/11/2022 10:56:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[lastName] [varchar](50) NULL,
	[username] [varchar](50) NOT NULL,
	[password] [varchar](50) NOT NULL,
	[cellphone] [varchar](50) NULL,
	[mail] [varchar](50) NOT NULL,
	[description] [text] NULL,
	[profilePicture] [varchar](255) NULL,
	[created_at] [datetime] NULL,
	[premium] [bit] NOT NULL,
	[occupation] [varchar](50) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_Publication] FOREIGN KEY([fkPublication])
REFERENCES [dbo].[Publication] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_Publication]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_User] FOREIGN KEY([fkUser])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_User]
GO
ALTER TABLE [dbo].[Follows]  WITH CHECK ADD  CONSTRAINT [FK_Follows_User] FOREIGN KEY([fkUser])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Follows] CHECK CONSTRAINT [FK_Follows_User]
GO
ALTER TABLE [dbo].[Follows]  WITH CHECK ADD  CONSTRAINT [FK_Follows_User1] FOREIGN KEY([followed])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Follows] CHECK CONSTRAINT [FK_Follows_User1]
GO
ALTER TABLE [dbo].[LikeOrDislike]  WITH CHECK ADD  CONSTRAINT [FK_LikeOrDislike_Publication] FOREIGN KEY([fkPublication])
REFERENCES [dbo].[Publication] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[LikeOrDislike] CHECK CONSTRAINT [FK_LikeOrDislike_Publication]
GO
ALTER TABLE [dbo].[LikeOrDislike]  WITH CHECK ADD  CONSTRAINT [FK_LikeOrDislike_User] FOREIGN KEY([fkUser])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[LikeOrDislike] CHECK CONSTRAINT [FK_LikeOrDislike_User]
GO
