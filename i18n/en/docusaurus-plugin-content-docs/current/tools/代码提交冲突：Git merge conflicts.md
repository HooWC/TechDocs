---
id: git-merge-conflicts
slug: /git-merge-conflicts
title: Git Merge Conflicts
date: 2024-11-04
authors: Hoo
tags: [tool]
keywords: [tool]
---

## Git Merge Conflicts

:::success Previous article reminder

Git is a very powerful version control tool that helps developers switch between multiple versions, track changes, and easily merge different code branches. However, when multiple developers work on different branches, they often encounter the problem of **Git merge conflict** (code merge conflict). In this article, we will take a deep dive into what Git merge conflicts are, why they occur, and how to resolve them.

:::

### 1. What is Git Merge Conflict?

When we use Git's `merge` command to merge changes from two branches together, if Git cannot merge these changes automatically, it will mark it as **merge conflict** and require developers to manually resolve the conflict. Usually, conflicts occur when multiple developers make different changes to the same line of the same file.

### 2. When do Merge Conflicts occur?

Merge conflicts usually occur in the following situations:

- Both branches modify the same line of the same file.

- A file is deleted in one branch and modified in another branch.
- Two branches make different changes to the same place, but Git cannot determine which change is the "correct" one.

### 3. Example of conflict

Suppose we have two developers, Developer A and Developer B, who create different branches in their local repositories at the same time. We will use a simple example to demonstrate the generation of conflicts.

#### Step 1: Create a repository and initialize it

First, we create a new Git repository and create a file in it.

```bash
# Create a New Directory
mkdir git-merge-conflict-example
cd git-merge-conflict-example

# Initialize Git repository
git init

# Create a new file and commit it
echo "This is the content of the file" > file.txt
git add file.txt
git commit -m "Initial commit"
```

#### Step 2: Create two branches

Next, we create two branches and modify them separately.

```bash
# Create and switch to dev-A branch
git checkout -b dev-A

# Revise file.txt
echo "This is A's change" > file.txt
git add file.txt
git commit -m "A's change"

# Switch to the master branch
git checkout master

# Create and switch to the dev-B branch
git checkout -b dev-B

# Revise file.txt
echo "This is B's change" > file.txt
git add file.txt
git commit -m "B's change"
```

#### Step 3: Try to merge

Now let's try to merge the `dev-B` branch into the `dev-A` branch. First switch back to `dev-A`:

```bash
# Switch back to the dev-A branch
git checkout dev-A

# Try to merge dev-B branch
git merge dev-B
```

### 4. How does Git mark Merge Conflict?

Git will find that the file `file.txt` has been modified in two branches, and the content conflicts and cannot be merged automatically. At this time, Git will mark the conflict and output the following information:

```base
Auto-merging file.txt
CONFLICT (content): Merge conflict in file.txt
Automatic merge failed; fix conflicts and then commit the result.
```

If you open the file `file.txt`, you will see that Git has inserted conflict markers into the file:

```
<<<<<<< HEAD
This is A's change
=======
This is B's change
>>>>>>> dev-B
```

- `<<<<<<< HEAD`Changes tagged for the `dev-A` branch.
- `=======` It is the dividing line of conflict.
- `>>>>>>> dev-B` Changes tagged for the `dev-B` branch.

### 5. Resolving Merge Conflicts

The process of resolving conflicts is very simple: you need to manually edit the file and decide which part should be kept. You can choose:

- Keep the changes of one side.

- Merge the changes of both.

For example, suppose you want to keep the changes of both `dev-A` and `dev-B`, you can modify the conflicting area to:

```
This is A's change
This is B's change
```

Then, remove the conflict markers and save the file.

### 6. Complete the merge

Once you have resolved all conflicts, execute the following command to submit the merge to Git:

```bash
# Add the resolved files to the staging area
git add file.txt

# Commit the merge
git commit -m "Resolved merge conflict"
```

Now, the merge conflict has been resolved and the merge has been successfully completed.

### 7. Avoid Git Merge Conflicts

Although conflicts are a common problem in Git, you can reduce the occurrence of conflicts by the following ways:

1. **Frequently pull changes from remote branches**: Make sure your local branch is up to date and reduce conflicts with other developers.

2. **Small-range commits**: Frequently commit and push your changes to avoid a huge change causing a lot of conflicts.

3. **Clear teamwork norms**: Make sure every developer understands the structure and development process of the code base, and try to avoid working on the same part of the code.

### 8. Conclusion

Git Merge Conflicts are inevitable challenges in the development process, but by understanding their causes and solutions, you can solve these problems more efficiently. With practice and experience, you will be able to deal with code conflicts more easily and improve development efficiency.

I hope that through the introduction of this article, you have a deeper understanding of Git merge conflicts. I wish you all the best in dealing with conflicts!