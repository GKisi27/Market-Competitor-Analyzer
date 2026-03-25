import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

conn = psycopg2.connect(host='localhost', port=5432, user='postgres', password='0490036', dbname='postgres')
conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
cur = conn.cursor()

# Create or update dev_user
cur.execute("SELECT 1 FROM pg_roles WHERE rolname='dev_user'")
if not cur.fetchone():
    cur.execute("CREATE USER dev_user WITH PASSWORD 'dev_password'")
    print('Created dev_user')
else:
    cur.execute("ALTER USER dev_user WITH PASSWORD 'dev_password'")
    print('Updated dev_user password to dev_password')

# Create mca_dev database if missing
cur.execute("SELECT 1 FROM pg_database WHERE datname='mca_dev'")
if not cur.fetchone():
    cur.execute('CREATE DATABASE mca_dev OWNER dev_user')
    print('Created mca_dev database')
else:
    print('mca_dev database already exists')

cur.execute('GRANT ALL PRIVILEGES ON DATABASE mca_dev TO dev_user')
print('Granted privileges on mca_dev to dev_user')

cur.close()
conn.close()
print('DB setup complete!')
