-- <%= Author %>

IF NOT EXISTS(SELECT TOP 1 NULL FROM dbo.SystemSetting WHERE [Key] = '<%= systemSettingKey %>')
INSERT INTO dbo.SystemSetting([Key], Value, Created, CreatedBy, Modified, ModifiedBy, Description)
VALUES (
    '<%= systemSettingKey %>',
    <%= systemSettingValue %>,
    getdate(),
    4323,
    getdate(),
    4323,
    '<%= systemSettingDescription %>'
)
