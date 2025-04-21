import mongoose from 'mongoose';

const IssueSchema = new mongoose.Schema({
  blockName: { type: String, required: true },
  issueText: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const Issues = mongoose.model('Issue', IssueSchema);

export default Issues;