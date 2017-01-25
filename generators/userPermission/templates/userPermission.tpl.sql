-- <%= Author %>

IF NOT EXISTS(SELECT NULL FROM dbo.Role WHERE RoleID = '<%= permissionName %>')
INSERT INTO dbo.Role(RoleID, Name, Description, IsUserToken, IsCore, Created, CreatedBy, Modified, ModifiedBy)
VALUES ('<%= permissionName %>', '<%= permissionDisplayName %>','<%= permissionDescription %>', 0, 0, GETDATE(), 4323, GETDATE(), 4323)
