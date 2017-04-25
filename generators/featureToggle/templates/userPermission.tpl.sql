-- <%= Author %>

IF NOT EXISTS(SELECT NULL FROM dbo.Role WHERE RoleID = '<%= featureToggleName %>')
INSERT INTO dbo.Role(RoleID, Name, Description, IsUserToken, IsCore, Created, CreatedBy, Modified, ModifiedBy)
VALUES ('<%= featureToggleName %>', '<%= featureToggleName %>','This is part of <%= featureToggleName %> feature toggle. Please check the system setting with the same name to enable this feature.', 0, 0, GETDATE(), 4323, GETDATE(), 4323)
