-- <%= Author %>

IF NOT EXISTS(SELECT TOP 1 NULL FROM dbo.SystemSetting WHERE [Key] = '<%= featureToggleName %>')
INSERT INTO dbo.SystemSetting([Key], Value, Created, CreatedBy, Modified, ModifiedBy, Description)
VALUES (
    '<%= featureToggleName %>',
    'false',
    getdate(),
    4323,
    getdate(),
    4323,
    'This is part of <%= featureToggleName %> feature toggle. If this is "restricted" please check a permission with the same name to enable this feature.'
)
